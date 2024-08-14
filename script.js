const qrInput = document.getElementById('qr-input');
const iconInput = document.getElementById('icon-input');
const qrCodeContainer = document.getElementById('qr-code');
const errorMessage = document.getElementById('error-message');
const downloadBtn = document.getElementById('download-btn');

let qrCode = new QRCodeStyling({
    width: 512,
    height: 512,
    dotsOptions: {
        color: "#000",
        type: "rounded"
    },
    backgroundOptions: {
        color: "#fff",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 20
    }
});

document.getElementById('generate-btn').addEventListener('click', () => {
    const url = qrInput.value.trim();

    if (!isValidURL(url)) {
        errorMessage.textContent = "Please enter a valid URL.";
        return;
    } else {
        errorMessage.textContent = "";
    }

    const file = iconInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            qrCode.update({
                data: url,
                image: event.target.result
            });
            qrCode.append(qrCodeContainer);
            downloadBtn.style.display = 'block'; // Show download button
        };
        reader.readAsDataURL(file);
    } else {
        qrCode.update({
            data: url,
            image: null
        });
        qrCode.append(qrCodeContainer);
        downloadBtn.style.display = 'block'; // Show download button
    }
});

downloadBtn.addEventListener('click', () => {
    qrCode.download({ name: "qr-code", extension: "png" });
});

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}
