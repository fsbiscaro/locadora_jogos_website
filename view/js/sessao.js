function existeSessao() {
    const token = localStorage.getItem("token");
    const payload = localStorage.getItem("payload");

    if (token == null || payload == null) {
        window.location = "./Login.html";
        return;
    } else {
        return JSON.parse(payload);
    }
}
