import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import * as fabric from "fabric";
import {
  Type,
  Image as ImageIcon,
  MessageSquare,
  Palette,
  ZoomIn,
  ZoomOut,
  Undo,
  Redo,
  Save,
  Trash2,
  Move,
  ChevronLeft,
  ChevronRight,
  Eye,
  Layers,
  ArrowUp,
  ArrowDown,
  BringToFront,
  SendToBack,
  SmilePlus,
  Square,
  Circle,
  Triangle,
  Star,
  MessageCircle,
  Cloud,
  X
} from "lucide-react";
import { Header } from "../components/Header";

export function Editor() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const totalPages = 21;

  // Initialize Canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Canvas dimensions representing a 2-page spread
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 533,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true, // Keep object layer order when selected
    });

    setCanvas(initCanvas);

    // Event listeners for active object state
    initCanvas.on('selection:created', (e) => {
      setActiveObject(e.selected?.[0] || null);
    });
    initCanvas.on('selection:updated', (e) => {
      setActiveObject(e.selected?.[0] || null);
    });
    initCanvas.on('selection:cleared', () => {
      setActiveObject(null);
    });

    // Handle Keyboard Delete
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const activeObj = initCanvas.getActiveObject();
        // Don't delete if editing text
        if (activeObj && (activeObj as any).isEditing) return;
        
        const activeObjects = initCanvas.getActiveObjects();
        if (activeObjects.length) {
          activeObjects.forEach((obj) => initCanvas.remove(obj));
          initCanvas.discardActiveObject();
          initCanvas.requestRenderAll();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      initCanvas.dispose();
    };
  }, []);

  // Tool functions
  const addText = () => {
    if (!canvas) return;
    const text = new fabric.IText('텍스트를 입력하세요', {
      left: 100,
      top: 100,
      fontFamily: 'sans-serif',
      fontSize: 24,
      fill: '#333333',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.requestRenderAll();
  };

  const addImage = () => {
    if (!canvas) return;
    const url = "https://images.unsplash.com/photo-1659695089950-96e6ea2d94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400";
    
    const imgElement = new Image();
    imgElement.crossOrigin = "anonymous";
    imgElement.src = url;
    imgElement.onload = () => {
      const imgInstance = new fabric.Image(imgElement);
      imgInstance.scaleToWidth(250);
      imgInstance.set({ left: 50, top: 50 });
      canvas.add(imgInstance);
      canvas.setActiveObject(imgInstance);
      canvas.requestRenderAll();
    };
  };

  const addSpecificShape = (type: string) => {
    if (!canvas) return;
    let shape: fabric.Object;

    const commonProps = {
      left: 150,
      top: 150,
      fill: '#e0e7ff',
      stroke: '#818cf8',
      strokeWidth: 2,
    };

    switch (type) {
      case 'rect':
        shape = new fabric.Rect({
          ...commonProps,
          width: 100,
          height: 100,
          rx: 10,
          ry: 10,
        });
        break;
      case 'circle':
        shape = new fabric.Circle({
          ...commonProps,
          radius: 50,
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle({
          ...commonProps,
          width: 100,
          height: 100,
        });
        break;
      case 'star':
        // A simple star polygon
        shape = new fabric.Polygon([
          { x: 50, y: 0 },
          { x: 61, y: 35 },
          { x: 98, y: 35 },
          { x: 68, y: 57 },
          { x: 79, y: 91 },
          { x: 50, y: 70 },
          { x: 21, y: 91 },
          { x: 32, y: 57 },
          { x: 2, y: 35 },
          { x: 39, y: 35 }
        ], {
          ...commonProps,
        });
        break;
      default:
        return;
    }

    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.requestRenderAll();
  };

  const addSpecificSticker = (emoji: string) => {
    if (!canvas) return;
    const text = new fabric.IText(emoji, {
      left: 200,
      top: 200,
      fontSize: 64,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.requestRenderAll();
  };

  const addSpecificBubble = (type: string) => {
    if (!canvas) return;
    
    let bubble: fabric.Object;
    const shadow = new fabric.Shadow({
      color: 'rgba(0,0,0,0.1)',
      blur: 10,
      offsetX: 2,
      offsetY: 2
    });

    const commonProps = {
      left: 120,
      top: 120,
      fill: '#ffffff',
      stroke: '#3b82f6',
      strokeWidth: 2,
      shadow
    };

    switch (type) {
      case 'rounded':
        bubble = new fabric.Rect({
          ...commonProps,
          width: 160,
          height: 100,
          rx: 20,
          ry: 20,
        });
        break;
      case 'square':
        bubble = new fabric.Rect({
          ...commonProps,
          width: 160,
          height: 100,
        });
        break;
      case 'circle':
        bubble = new fabric.Ellipse({
          ...commonProps,
          rx: 80,
          ry: 50,
        });
        break;
      case 'thought':
        // Thought bubble rough path
        bubble = new fabric.Path('M 50,50 C 30,50 30,20 50,20 C 50,0 80,0 80,20 C 100,0 130,0 130,20 C 150,20 150,50 130,50 C 150,70 130,100 100,100 C 80,100 80,80 80,80 C 80,100 50,100 50,80 C 30,80 30,50 50,50 Z', {
          ...commonProps,
        });
        break;
      default:
        return;
    }

    canvas.add(bubble);
    canvas.setActiveObject(bubble);
    canvas.requestRenderAll();
  };

  // Layer Management
  const handleLayerOrder = (action: 'bringForward' | 'sendBackwards' | 'bringToFront' | 'sendToBack') => {
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (!obj) return;

    if (action === 'bringForward') canvas.bringObjectForward(obj);
    if (action === 'sendBackwards') canvas.sendObjectBackwards(obj);
    if (action === 'bringToFront') canvas.bringObjectToFront(obj);
    if (action === 'sendToBack') canvas.sendObjectToBack(obj);
    
    canvas.requestRenderAll();
  };

  const deleteSelected = () => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length) {
      activeObjects.forEach((obj) => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  const tools = [
    { id: "text", icon: Type, name: "텍스트", action: addText },
    { id: "image", icon: ImageIcon, name: "이미지", action: addImage },
    { id: "shape", icon: Palette, name: "도형", action: () => setActiveMenu(activeMenu === 'shape' ? null : 'shape') },
    { id: "bubble", icon: MessageSquare, name: "말풍선", action: () => setActiveMenu(activeMenu === 'bubble' ? null : 'bubble') },
    { id: "sticker", icon: SmilePlus, name: "스티커", action: () => setActiveMenu(activeMenu === 'sticker' ? null : 'sticker') },
  ];

  const stickersList = [
    '💖', '✨', '🍀', '🌟', '🔥', '🎈', '🎉', '🎁', '🎀', '🧸', 
    '🐾', '🌸', '🌼', '🌺', '🌻', '🍎', '🍓', '🍒', '🍉', '🍕', 
    '🍩', '🍦', '☕', '🎸', '🎨', '🚀', '🌈', '☀️', '🌙', '⭐',
    '😊', '😍', '😎', '🥳', '👻', '👽', '👾', '🤖', '👑', '💎'
  ];

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!canvas) return;

    const files = Array.from(e.dataTransfer.files);
    
    files.forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (f) => {
        const data = f.target?.result as string;
        if (!data) return;

        const imgElement = new Image();
        imgElement.src = data;
        imgElement.onload = () => {
          const imgInstance = new fabric.Image(imgElement);
          // Scale image to a reasonable size if it's too large
          if (imgInstance.width && imgInstance.width > 400) {
            imgInstance.scaleToWidth(400);
          } else {
            imgInstance.scaleToWidth(250);
          }

          // Place the image near the drop location
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Adjust position so the mouse is roughly in the center of the image
            const finalX = Math.max(0, x - (imgInstance.getScaledWidth() / 2));
            const finalY = Math.max(0, y - (imgInstance.getScaledHeight() / 2));
            
            imgInstance.set({ left: finalX, top: finalY });
          } else {
            imgInstance.set({ left: 50, top: 50 });
          }

          canvas.add(imgInstance);
          canvas.setActiveObject(imgInstance);
          canvas.requestRenderAll();
        };
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div 
      className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden text-gray-900"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Header />

      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm z-10 relative">
        <div className="flex items-center gap-6">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-500" />
            스마트 캔버스 에디터
          </h2>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
            <button className="p-2 rounded hover:bg-white hover:shadow-sm text-gray-600 transition-all">
              <Undo className="w-4 h-4" />
            </button>
            <button className="p-2 rounded hover:bg-white hover:shadow-sm text-gray-600 transition-all">
              <Redo className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-100">
            <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-semibold text-sm px-3 text-gray-700 w-16 text-center">
              100%
            </span>
            <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
          <button className="px-5 py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-all flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
            <Save className="w-4 h-4 text-gray-300" />
            <span>저장하기</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Tools */}
        <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-3 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          {tools.map((tool) => {
            const ToolIcon = tool.icon;
            const isActive = activeMenu === tool.id;
            return (
              <button
                key={tool.id}
                onClick={tool.action}
                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 border ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 border-blue-100 scale-105' 
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border-transparent hover:border-blue-100 hover:scale-105'
                }`}
                title={tool.name}
              >
                <ToolIcon className="w-5 h-5" />
                <span className="text-[10px] font-medium">
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sub Panel for Options */}
        {activeMenu && (
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.05)] absolute left-20 top-0 bottom-0 animate-in slide-in-from-left-5">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-800">
                {tools.find(t => t.id === activeMenu)?.name} 추가
              </h3>
              <button onClick={() => setActiveMenu(null)} className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {activeMenu === 'shape' && (
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => { addSpecificShape('rect'); setActiveMenu(null); }} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <Square className="w-6 h-6 text-indigo-400" />
                    <span className="text-xs font-medium text-gray-600">사각형</span>
                  </button>
                  <button onClick={() => { addSpecificShape('circle'); setActiveMenu(null); }} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <Circle className="w-6 h-6 text-indigo-400" />
                    <span className="text-xs font-medium text-gray-600">원형</span>
                  </button>
                  <button onClick={() => { addSpecificShape('triangle'); setActiveMenu(null); }} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <Triangle className="w-6 h-6 text-indigo-400" />
                    <span className="text-xs font-medium text-gray-600">삼각형</span>
                  </button>
                  <button onClick={() => { addSpecificShape('star'); setActiveMenu(null); }} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <Star className="w-6 h-6 text-indigo-400" />
                    <span className="text-xs font-medium text-gray-600">별</span>
                  </button>
                </div>
              )}
              {activeMenu === 'bubble' && (
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => { addSpecificBubble('rounded'); setActiveMenu(null); }} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                    <span className="text-xs font-medium text-gray-600">둥근 사각</span>
                  </button>
                  <button onClick={() => { addSpecificBubble('circle'); setActiveMenu(null); }} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <MessageCircle className="w-6 h-6 text-blue-400" />
                    <span className="text-xs font-medium text-gray-600">타원형</span>
                  </button>
                  <button onClick={() => { addSpecificBubble('thought'); setActiveMenu(null); }} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <Cloud className="w-6 h-6 text-blue-400" />
                    <span className="text-xs font-medium text-gray-600">생각</span>
                  </button>
                  <button onClick={() => { addSpecificBubble('square'); setActiveMenu(null); }} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <Square className="w-6 h-6 text-blue-400" />
                    <span className="text-xs font-medium text-gray-600">직각</span>
                  </button>
                </div>
              )}
              {activeMenu === 'sticker' && (
                <div className="grid grid-cols-4 gap-2">
                  {stickersList.map((emoji, idx) => (
                    <button 
                      key={idx}
                      onClick={() => { addSpecificSticker(emoji); setActiveMenu(null); }}
                      className="w-12 h-12 flex items-center justify-center text-2xl rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Canvas Area */}
        <div className={`flex-1 bg-gray-100/50 p-6 overflow-auto relative flex flex-col transition-all duration-300 ${activeMenu ? 'ml-64' : ''}`}>
          {/* Subtle dot background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Page Navigation */}
          <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="bg-white px-5 py-2 rounded-full font-bold text-sm shadow-sm border border-gray-200 text-gray-700">
              Pages{" "}
              <span className="text-blue-600 mx-1">
                {currentPage * 2 - 1}-{currentPage * 2}
              </span>{" "}
              / {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Canvas Container */}
          <div className="flex-1 flex justify-center items-center relative z-10 min-h-0">
            <div className="bg-white shadow-2xl rounded-sm ring-1 ring-gray-200 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent pointer-events-none z-50 shadow-inner" />
              <canvas ref={canvasRef} className="rounded-sm" />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties & Layers */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 p-2 gap-2 bg-gray-50/50">
            <button className="flex-1 py-2 text-sm font-bold rounded-lg bg-white text-gray-900 shadow-sm ring-1 ring-gray-200">
              도구 속성
            </button>
          </div>

          <div className="p-5 flex-1 overflow-auto space-y-6">
            {activeObject ? (
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    레이어 순서
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => handleLayerOrder('bringForward')}
                      className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 transition-colors text-sm font-medium text-gray-700"
                    >
                      <ArrowUp className="w-4 h-4" /> 앞으로
                    </button>
                    <button 
                      onClick={() => handleLayerOrder('sendBackwards')}
                      className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 transition-colors text-sm font-medium text-gray-700"
                    >
                      <ArrowDown className="w-4 h-4" /> 뒤로
                    </button>
                    <button 
                      onClick={() => handleLayerOrder('bringToFront')}
                      className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 transition-colors text-sm font-medium text-gray-700"
                    >
                      <BringToFront className="w-4 h-4" /> 맨 앞으로
                    </button>
                    <button 
                      onClick={() => handleLayerOrder('sendToBack')}
                      className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 transition-colors text-sm font-medium text-gray-700"
                    >
                      <SendToBack className="w-4 h-4" /> 맨 뒤로
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-4">
                    요소 관리
                  </h4>
                  <button 
                    onClick={deleteSelected}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 transition-colors font-semibold"
                  >
                    <Trash2 className="w-4 h-4" />
                    선택 요소 삭제
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <Move className="w-8 h-8" />
                </div>
                <p className="text-gray-500 font-medium">캔버스에서 객체를 선택하면<br/>속성을 편집할 수 있습니다</p>
                <p className="text-xs text-gray-400 mt-2">드래그하여 여러 객체 선택 가능</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] z-20">
        <div className="flex items-center gap-3 bg-blue-50/50 px-4 py-2 rounded-full border border-blue-100">
          <span className="text-blue-500">💡</span>
          <span className="text-sm font-medium text-gray-600">
            드래그 앤 드롭으로 이동, 모서리를 잡아 크기 조절과 회전이 가능합니다
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/chapters")}
            className="px-6 py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-colors"
          >
            이전으로
          </button>
          <button
            onClick={() => navigate("/preview")}
            className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>최종 미리보기</span>
          </button>
        </div>
      </div>
    </div>
  );
}