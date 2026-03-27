function viewCam(name, element) {
    // 1. Muda a imagem (seu código atual)
    const display = document.getElementById('cam-display');
    let imgUrl = imgs[`${name}_vazio`];
    if (freddyLocation === name) imgUrl = imgs[`${name}_freddy`];
    display.style.backgroundImage = `url('${imgUrl}')`;

    // 2. NOVO: Muda a cor do botão selecionado
    document.querySelectorAll('.cam-btn').forEach(btn => btn.classList.remove('active-cam'));
    element.classList.add('active-cam');
}
