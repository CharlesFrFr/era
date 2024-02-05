#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, WindowEvent, Runtime};
use window_shadows::set_shadow;

mod liberal;

#[tauri::command]
async fn download<R: Runtime>(app: tauri::AppHandle<R>, window: tauri::Window<R>, request: liberal::DownloadRequest) -> Result<(), String> {
  liberal::dl(app, window, request).await
}

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let window = app.get_window("main").unwrap();
      set_shadow(&window, true).expect("Unsupported platform!");

      window.on_window_event(|event| match event {
        WindowEvent::Resized(..) => std::thread::sleep(std::time::Duration::from_nanos(1)),
        _ => {}
      });

      Ok(())
    })
    .invoke_handler(tauri::generate_handler![
      download
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
