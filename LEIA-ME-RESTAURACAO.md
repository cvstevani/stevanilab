# Backup do site StevaniLab

Este pacote contém uma cópia portátil do site **StevaniLab — The Living Light of Fungi**, incluindo código, textos, imagens publicadas e a tabela de notícias.

## Conteúdo

- `app/`: páginas, textos e organização do site.
- `public/`: logos, fotografias e demais imagens usadas.
- `data/noticias-posts.tsv`: dados originais das notícias.
- `data/noticias-posts-corrigidos.xlsx`: tabela organizada das notícias.
- Arquivos de configuração necessários para reconstruir o site.

## Como restaurar

1. Descompacte este arquivo.
2. Entregue a pasta a um desenvolvedor ou serviço de hospedagem compatível com aplicações Next.js/React.
3. Instale as dependências descritas no arquivo `package.json`.
4. Gere a versão de produção e publique-a em uma nova hospedagem.
5. No provedor do domínio, altere os registros DNS de `www.stevanilab.com` para o endereço fornecido pela nova hospedagem.

O domínio e os registros de e-mail devem ser administrados separadamente. Ao trocar de hospedagem, preserve os registros MX e TXT usados pelo e-mail.

## Plataformas alternativas

O projeto pode ser adaptado para serviços como Vercel, Cloudflare ou outra hospedagem compatível. O domínio não precisa ser transferido para mudar a hospedagem.

## Data do backup

8 de agosto de 2026.
