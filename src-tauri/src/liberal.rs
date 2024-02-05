use std::cmp::min;
use futures_util::StreamExt;
use tokio::io::AsyncWriteExt;
use tauri::{Manager, Runtime};

#[derive(serde::Serialize, serde::Deserialize)]
pub struct DownloadRequest {
  url: String,
  file_path: String,
  expected_size: u64,
}

#[derive(serde::Serialize, serde::Deserialize)]
#[derive(Clone)]
struct DownloadProgress {
  received: u64,
  total: u64,
}

pub async fn dl<R: Runtime>(app: tauri::AppHandle<R>, window: tauri::Window<R>, request: DownloadRequest) -> Result<(), String> {
  let url = request.url;
  let file_path = request.file_path;
  let expected_size = request.expected_size;

  let client = reqwest::Client::new();
  let response = client.get(&url).send().await.map_err(|e| e.to_string())?;
  let mut stream = response.bytes_stream();
  let mut file = tokio::fs::File::create(&file_path).await.map_err(|e| e.to_string())?;
  
  let mut progress = DownloadProgress {
    received: 0,
    total: expected_size,
  };

  while let Some(chunk) = stream.next().await {
    let chunk = chunk.map_err(|e| e.to_string())?;
    file.write_all(&chunk).await.map_err(|e| e.to_string())?;

    let new = min(progress.received + chunk.len() as u64, progress.total);
    progress.received = new;

    let c = progress.clone();
    
    app.emit_to(
      &window.label(),
      "update:dl",
      Some(c)
    ).map_err(|e| e.to_string())?;

    if progress.received == progress.total {
      break;
    }
  }

  if progress.received != progress.total {
    return Err("Download incomplete".to_string());
  }

  Ok(())
}