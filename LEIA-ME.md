# Temperinho Querido — Gestor de vendas

## Arquivos
- `index.html`: aplicativo, interface, estilos e funções.
- `manifest.webmanifest`: nome, cores, ícones e modo de abertura PWA.
- `sw.js`: cache offline e atualização do aplicativo.
- `icon-192.png` e `icon-512.png`: ícones da instalação.

## Como testar
1. Extraia o ZIP.
2. Abra `index.html` para testar a interface e os cálculos no navegador. A instalação PWA não funciona ao abrir o arquivo diretamente.
3. Substitua os preços de exemplo pelos preços reais em **Cadastros**.
4. Faça vendas e gastos fictícios, confira o **Controle mensal**, o acréscimo/desconto e os gráficos.
5. Em **Backup e dados**, exporte um backup JSON e teste a restauração.

## Instalar no Android
Para uma instalação PWA confiável, publique todos os arquivos juntos em um endereço HTTPS e abra esse endereço no Chrome. Use o menu do Chrome e procure **Instalar app** ou **Adicionar à tela inicial**. Se a opção não aparecer, confira se o endereço é HTTPS, se o manifesto está carregando e se o service worker foi registrado. Os ícones já estão incluídos. Depois da primeira abertura online, o cache ajuda o aplicativo a funcionar offline.

## Funções incluídas
- Registro de vendas com vários grupos de marmitas, tamanhos, adicionais, região e forma de pagamento.
- Desconto percentual ou em reais por marmita; alternativamente, acréscimo percentual ou em reais por marmita. Desconto e acréscimo são opções mutuamente exclusivas. A taxa de entrega fica separada.
- Aba **Gastos** para registrar compras, categoria, data, valor e forma de pagamento.
- **Controle mensal** com faturamento, gastos, saldo estimado após gastos, quantidade de pedidos, total vendido por forma de pagamento (incluindo PIX, dinheiro e maquininha) e gastos por categoria.
- **Personalizar layout** para reordenar e renomear abas e escolher modo padrão ou menu lateral estilo hambúrguer.
- Histórico, gráficos, cadastros editáveis e backup/restauração.

## Observações importantes
- Os preços iniciais são exemplos e precisam ser ajustados.
- O saldo mensal é faturamento menos gastos registrados; não é lucro contábil completo se houver custos ou taxas não lançados.
- O armazenamento usa `localStorage` no navegador e fica neste aparelho. Limpar os dados do navegador pode apagar registros. Faça backups frequentes.
- O ZIP é o projeto, não um aplicativo já instalado nem um serviço de hospedagem.
- Antes de substituir uma versão que já tenha vendas reais, exporte um backup. Depois da atualização, confira as vendas e os cadastros e faça outro backup.
