import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";
import "./CKEditor.css";
import { editorConfig } from "./config";

export function CKEditorField({
  name,
  control,
  label,
  disabled = false,
  onChange,
}) {
  const editorContainerRef = useRef(null);
  const editorMenuBarRef = useRef(null);
  const editorToolbarRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  const {
    field: { value, onChange: controllerOnChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file
            .then((file) => {
              const formData = new FormData();
              formData.append("thumbnail", file);

              //   uploadApi
              //     .upload(formData)
              //     .then((res) => {
              //       if (res?.url) {
              //         resolve({ default: res.url });
              //       } else {
              //         reject("Không có URL trả về");
              //       }
              //     })
              //     .catch(reject);
            })
            .catch(reject);
        });
      },
    };
  }

  function uploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
      uploadAdapter(loader);
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition overflow-hidden">
        <div
          ref={editorContainerRef}
          className="editor-container editor-container_document-editor editor-container_include-style"
        >
          <div ref={editorMenuBarRef} className="px-4 py-2 bg-white" />
          <div ref={editorToolbarRef} className="px-4 py-2 bg-white" />
          <div className="editor-container__editor-wrapper">
            <div className="editor-container__editor">
              <div ref={editorRef}>
                {isLayoutReady && (
                  <CKEditor
                    disabled={disabled}
                    onReady={(editor) => {
                      editorToolbarRef.current?.appendChild(
                        editor.ui.view.toolbar.element
                      );
                      editorMenuBarRef.current?.appendChild(
                        editor.ui.view.menuBarView.element
                      );
                    }}
                    onAfterDestroy={() => {
                      Array.from(
                        editorToolbarRef.current?.children || []
                      ).forEach((child) => child.remove());
                      Array.from(
                        editorMenuBarRef.current?.children || []
                      ).forEach((child) => child.remove());
                    }}
                    editor={DecoupledEditor}
                    config={{
                      ...editorConfig,
                      extraPlugins: [uploadAdapterPlugin],
                    }}
                    data={value}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      controllerOnChange(data);
                      onChange?.(data);
                    }}
                    onBlur={onBlur}
                    ref={ref}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {invalid && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error?.message}
        </p>
      )}
    </div>
  );
}
