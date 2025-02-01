// view mankirat_singh.pdf in the browser on this page

export default function Resume() {
    return (
        <div>
        <iframe
            src="/mankirat_resume.pdf"
            width="100%"
            height="100%"
            style={{ minHeight: "100vh" }}
        ></iframe>
        </div>
    );
    }