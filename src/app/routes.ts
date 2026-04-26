import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Upload } from "./pages/Upload";
import { ProcessingImages } from "./pages/ProcessingImages";
import { ImageSelection } from "./pages/ImageSelection";
import { Analysis } from "./pages/Analysis";
import { Chapters } from "./pages/Chapters";
import { Editor } from "./pages/Editor";
import { Preview } from "./pages/Preview";
import { Export } from "./pages/Export";
import { Samples } from "./pages/Samples";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/upload",
    Component: Upload,
  },
  {
    path: "/processing",
    Component: ProcessingImages,
  },
  {
    path: "/image-selection",
    Component: ImageSelection,
  },
  {
    path: "/analysis",
    Component: Analysis,
  },
  {
    path: "/chapters",
    Component: Chapters,
  },
  {
    path: "/editor",
    Component: Editor,
  },
  {
    path: "/preview",
    Component: Preview,
  },
  {
    path: "/export",
    Component: Export,
  },
  {
    path: "/samples",
    Component: Samples,
  },
]);