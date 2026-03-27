function moveFreddy() {
    let ai = setInterval(() => {
        if (!gameActive) { clearInterval(ai); return; }

        // Definimos as salas disponíveis
        const salasComuns = ["palco", "cozinha", "gerador"];
        
        // Regra de Ouro: Sorteio de movimentação
        let chance = Math.random();

        if (chance > 0.5) { // 50% de chance de ele tentar se mover
            
            if (freddyLocation === "corredor") {
                // Se ele já está no corredor, ele tem 30% de chance de entrar na sala
                // e 70% de chance de voltar para uma sala aleatória (recuar)
                if (Math.random() < 0.3) {
                    freddyLocation = "sala";
                    console.log("⚠️ CUIDADO: Freddy entrou na sala!");
                } else {
                    freddyLocation = salasComuns[Math.floor(Math.random() * salasComuns.length)];
                    console.log("😅 Alívio: Freddy recuou para " + freddyLocation);
                }
            } 
            else if (freddyLocation === "sala") {
                // Se já está na sala, ele não se move mais (espera o erro do jogador)
                return;
            } 
            else {
                // Se ele está nas salas comuns, ele pode ir para o CORREDOR ou trocar de sala
                // Criamos uma lista de destinos possíveis incluindo o corredor
                let destinos = [...salasComuns, "corredor"];
                // Remove a sala onde ele já está para ele não "ir para onde já está"
                destinos = destinos.filter(s => s !== freddyLocation);
                
                freddyLocation = destinos[Math.floor(Math.random() * destinos.length)];
                console.log("👻 Movimentação Aleatória: Freddy foi para " + freddyLocation);
            }

            // Atualiza a câmera se o monitor estiver aberto
            if (isCamsOpen) {
                // Forçamos a atualização da visão da câmera atual
                const activeBtn = document.querySelector('.active-cam');
                const currentCamName = activeBtn ? activeBtn.getAttribute('onclick').match(/'([^']+)'/)[1] : 'palco';
                viewCam(currentCamName, activeBtn);
            }
        }
    }, 5000); // Checagem mais rápida (5s) para aumentar a tensão
}
