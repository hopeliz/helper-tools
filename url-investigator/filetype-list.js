const fileTypes = [
    {
        extension: "avi",
        type: "Audio Video Interleave (AVI) file"
    },
    {
        extension: "bmp",
        type: "Bitmap image"
    },
    {
        extension: "css",
        type: "Cascasding Style Sheets file"
    },
    {
        extension: "csv",
        type: "Comma-Separated Values - table/spreadsheet"
    },
    {
        extension: "doc",
        type: "Microsoft Word document"
    },
    {
        extension: "docx",
        type: "Microsoft Word document"
    },
    {
        extension: "exe",
        type: "Executable file"
    },
    {
        extension: "gif",
        type: "Graphics Interchange Format (GIF) image"
    },
    {
        extension: "ico",
        type: "Windows icon file"
    },
    {
        extension: "htm",
        type: "HyperText Markup Language (HTML) webpage"
    },
    {
        extension: "html",
        type: "HyperText Markup Language (HTML) webpage"
    },
    {
        extension: "jpeg",
        type: "JPEG image"
    },
    {
        extension: "jpg",
        type: "JPG image"
    },
    {
        extension: "js",
        type: "JavaScript file"
    },
    {
        extension: "json",
        type: "JavaScript Object Notation (JSON) file"
    },
    {
        extension: "mov",
        type: "QuickTime video"
    },
    {
        extension: "mp3",
        type: "MP3 Audio"
    },
    {
        extension: "mp4",
        type: "MP4 Video"
    },
    {
        extension: "mpeg",
        type: "MPEG Video"
    },
    {
        extension: "odg",
        type: "OpenDocument graphics document"
    },
    {
        extension: "odt",
        type: "OpenDocument Text document"
    },
    {
        extension: "ogg",
        type: "OGG Video"
    },
    {
        extension: "pdf",
        type: "Adobe Acrobat document"
    },
    {
        extension: "php",
        type: "PHP document"
    },
    {
        extension: "png",
        type: "Portable Network Graphics (PNG) image"
    },
    {
        extension: "ppt",
        type: "Microsoft PowerPoint presentation"
    },
    {
        extension: "pptx",
        type: "Microsoft PowerPoint presentation"
    },
    {
        extension: "psd",
        type: "Adobe Photoshop project file"
    },
    {
        extension: "py",
        type: "Python file"
    },
    {
        extension: "rar",
        type: "Archive / compressed file"
    },
    {
        extension: "rtf",
        type: "Real Text Format document"
    },
    {
        extension: "svg",
        type: "Scalable Vector Graphics (SVG) image"
    },
    {
        extension: "tif",
        type: "Tag Image File Format (TIFF) image"
    },
    {
        extension: "tiff",
        type: "Tag Image File Format (TIFF) image"
    },
    {
        extension: "txt",
        type: "Plaintext file"
    },
    {
        extension: "wav",
        type: "Waveform audio file"
    },
    {
        extension: "webp",
        type: "WebP image"
    },
    {
        extension: "xls",
        type: "Microsoft Excel spreadsheet"
    },
    {
        extension: "xlsx",
        type: "Microsoft Excel spreadsheet"
    },
    {
        extension: "xml",
        type: "XML data file"
    },
    {
        extension: "zip",
        type: "Archive / compressed file"
    }
];
    
function getFileTypeInfo(ext) {
    ext = ext.toLowerCase();
    let info = "";
    for (let x in fileTypes) {
        if (fileTypes[x].extension == ext) {
            info = " - " + fileTypes[x].type;
        }
    }

    return info;
}