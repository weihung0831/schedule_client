import Toastify from 'toastify-js'

export function successToast(msg) {
    Toastify({
        text: msg,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
        },
        duration: 3000,
        close: true,
    })
        .showToast();
}
