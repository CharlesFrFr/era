import "src/styles/banner.css";

const VersionBanner = () => {
  return (
    <div className="banner">
      <b>Note!</b>
      <p>You can download the publicly available version</p>
      <code>7.40-CL-5046157</code>
      <p>here.</p>
      <s />
      <button>Download</button>
    </div>
  );
};

export default VersionBanner;
