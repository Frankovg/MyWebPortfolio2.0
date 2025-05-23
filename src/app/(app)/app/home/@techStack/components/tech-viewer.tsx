import DesktopTechViewer from "./desktop-tech-viewer";
import MobileTechViewer from "./mobile-tech-viewer";

function TechViewer() {
  return (
    <div className="w-full max-w-5xl flex max-sm:flex-col-reverse">
      <DesktopTechViewer />
      <MobileTechViewer />
    </div>
  )
}

export default TechViewer;