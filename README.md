# Jogo de Rebater Bolinha com Obstáculos

Este é um jogo simples desenvolvido em JavaScript usando a API Canvas do HTML5. O objetivo do jogo é rebater a bolinha com a raquete e destruir todos os obstáculos sem deixar a bolinha cair.

## Como Jogar

- **Movimentar a Raquete**: Use as setas `←` (esquerda) e `→` (direita) para mover a raquete.
- **Reiniciar o Jogo**: Se o jogo acabar, pressione a tecla `Espaço` para reiniciar.
- **Objetivo**: Destrua todos os obstáculos rebatendo a bolinha com a raquete. Cada obstáculo destruído aumenta sua pontuação.
- **Vidas**: Você começa com 5 vidas. Se a bolinha cair 5 vezes, o jogo acaba.

## Funcionalidades

- **Raquete**: A raquete pode ser movida horizontalmente para rebater a bolinha.
- **Bolinha**: A bolinha se move pela tela e rebate nas paredes, na raquete e nos obstáculos.
- **Obstáculos**: Os obstáculos são destruídos quando a bolinha os atinge. Cada obstáculo destruído aumenta a pontuação.
- **Pontuação**: A pontuação é exibida no canto superior direito da tela.
- **Vidas**: O número de vidas restantes é exibido no canto superior esquerdo da tela.
- **Game Over**: Quando as vidas acabam, o jogo termina e uma mensagem de "Game Over" é exibida.

## Estrutura do Código

O código está organizado em classes que representam os elementos do jogo:

- **Entity**: Classe base para todos os elementos do jogo (raquete, bolinha e obstáculos).
- **Racket**: Representa a raquete que o jogador controla.
- **Ball**: Representa a bolinha que se move pela tela.
- **Obstaule**: Representa os obstáculos que devem ser destruídos.
- **Game**: Classe principal que gerencia o loop do jogo, a lógica de colisão e a renderização.

## Como Executar

1. Clone este repositório ou copie o código para um arquivo HTML.
2. Abra o arquivo HTML em um navegador que suporte JavaScript e Canvas.
3. Divirta-se jogando!