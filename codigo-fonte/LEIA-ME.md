# Site ORYGEN — React

Site institucional da ORYGEN (soluções financeiras, consultoria tributária e tecnologia white label), feito em **React 18 + Vite + react-router-dom**.

## O que tem neste pacote

| Pasta / arquivo                     | Para que serve                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `dist/`                             | **Site pronto (já compilado).** É esta pasta que você sobe se a sua plataforma só aceitar arquivos estáticos. |
| `src/`                              | Código-fonte em React: uma página por arquivo em `src/pages/`, componentes em `src/components/`.              |
| `public/`                           | Favicon e pontos do símbolo em partículas (`data/og_points.json`).                                            |
| `vercel.json` e `public/_redirects` | Fazem as rotas (/baas, /tributario…) e a página 404 funcionarem na Vercel e na Netlify.                       |

## Como publicar

**Opção 1 — Vercel ou Netlify (recomendado)**

1. Suba esta pasta para um repositório no GitHub.
2. Na Vercel (ou Netlify), clique em "Add New Project" e escolha o repositório.
3. Ela detecta o Vite sozinha. Se pedir: comando de build `npm run build`, pasta de saída `dist`.

**Opção 2 — Hospedagem comum (Hostinger, Locaweb, cPanel etc.)**

1. Envie o **conteúdo** da pasta `dist/` para a pasta pública do domínio (geralmente `public_html`).
2. Para as rotas (/baas, /tributario…) e a página 404 funcionarem em servidor Apache, crie um arquivo `.htaccess` com:
   ```
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

**Opção 3 — Rodar no computador (para o desenvolvedor)**

```
npm install
npm run dev
```

## Onde mexer

| Quero mudar…                                   | Arquivo                                                                 |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| Cores, fontes, espaçamentos                    | `src/styles.css` (cores no início, em `:root`)                          |
| Contatos, CNPJ, redes sociais, indexação       | `src/config.js` (campo vazio = não aparece no site)                     |
| Rotas (endereços das páginas)                  | `src/App.jsx`                                                           |
| Cabeçalho e menu "Soluções"                    | `src/components/Header.jsx` (lista `SOLUCOES`)                          |
| Rodapé                                         | `src/components/Footer.jsx`                                             |
| Rolagem suave, volta ao topo, âncoras          | `src/components/Layout.jsx`                                             |
| Textos e seções de cada página                 | `src/pages/Home.jsx`, `Baas.jsx`, `WhiteLabelPage.jsx`, `Tributario.jsx`, `Regularizacao.jsx`, `Recuperacao.jsx`, `Legal.jsx`, `NotFound.jsx` |
| Topo da página inicial (partículas)            | `src/components/Hero.jsx` + `OGParticles.jsx`                           |
| Componentes reutilizáveis (topo interno, camadas, régua, cartões, abas, FAQ, formulário) | `src/components/ui.jsx`                      |
| Formulário tributário (campos e textos)        | `src/components/Tax.jsx`                                                |
| Painel de módulos / troca de marca             | `src/components/Modules.jsx` / `src/components/WhiteLabel.jsx`          |
| Para onde vai o formulário                     | função `enviar` em `src/components/ui.jsx`                              |
| Logo (geometria oficial)                       | `src/brand/` (viewBox exatos em `symbol_vb.txt` e `lockup_vb.txt`)      |

## Versão 5 (out/2026): várias páginas, mesmo visual

Pedido do cliente: "não é pra fazer igual o design, só a questão das sessões e conteúdo, é um site institucional, o cliente amou o modelo atual, só informação e páginas."

O visual da v4 foi mantido (safira, Montserrat, Lenis, topo preso com partículas, camadas e régua presas na tela, entradas discretas, painel de módulos, troca de marca). O que mudou foi a **arquitetura de informação**: o conteúdo e as páginas vêm do site de referência gerado à parte (`PROJETO ORYGEN/orygen-site/orygen-site/`: `src/config.mjs`, `src/pages/*.mjs`, `brand-source/briefing-site.txt` e `PENDENCIAS.md`). Nenhum número, cliente, certificação ou endereço foi inventado.

### Páginas e rotas

| Rota | Página | Arquivo |
|---|---|---|
| `/` | A ORYGEN (institucional) | `src/pages/Home.jsx` |
| `/baas` | Soluções financeiras (ORYGEN BaaS) | `src/pages/Baas.jsx` |
| `/white-label` | BaaS White Label (ORYGEN Tech) | `src/pages/WhiteLabelPage.jsx` |
| `/tributario` | Consultoria tributária (ORYGEN Tax) | `src/pages/Tributario.jsx` |
| `/tributario/regularizacao` | Regularização de dívidas tributárias | `src/pages/Regularizacao.jsx` |
| `/tributario/recuperacao-de-creditos` | Recuperação de créditos tributários | `src/pages/Recuperacao.jsx` |
| `/privacidade`, `/termos` | Minutas sujeitas à revisão jurídica | `src/pages/Legal.jsx` |
| qualquer outra | Página 404 | `src/pages/NotFound.jsx` |

- Na pré-visualização (build com `--base=./`) as rotas usam `#`, por exemplo `index.html#/baas`. No domínio definitivo (build normal) os endereços são limpos (`/baas`).
- Cada página define o próprio título e a descrição (`usePageMeta`).
- Ao trocar de página o site volta ao topo; links para uma seção de outra página (ex.: "Vincular movimentações…" → `/baas`, seção Estruturas vinculadas) abrem a página e rolam até a seção. A rolagem suave (Lenis) é uma só para o site inteiro e continua ativa entre as páginas.

### Estrutura comum

- **Cabeçalho:** "A ORYGEN", menu **Soluções** (BaaS, White Label, Consultoria tributária, Regularização, Recuperação de créditos) e o botão "Fale com a ORYGEN". No computador, o menu abre ao passar o mouse ou com clique/Enter; seta para baixo entra nos links, setas navegam, Esc fecha e devolve o foco. No celular, um menu em tela cheia (Esc fecha; a rolagem do fundo pausa enquanto ele está aberto).
- **Rodapé:** todas as páginas, seções da página inicial, Política de Privacidade, Termos de Uso, aviso sobre o papel das instituições parceiras, razão social e CNPJ.
- **Topo das páginas internas:** mesmo fundo escuro do topo da inicial, com rótulo, título em dois tons, botões e uma ilustração (painel de conta, aplicativo com marca fictícia ou roteiro tributário), sempre rotulada como ilustrativa.
- **Animações da v4 reaproveitadas:** as camadas presas (`PinnedLayers`) e a régua de etapas presa (`PinnedSteps`) agora servem a várias páginas; as demais seções usam a entrada discreta (`data-reveal`). Com movimento reduzido, nada fica preso e tudo aparece no estado final.

### De onde veio cada bloco

**Página inicial** (`home.mjs` da referência + v4)
- Topo com partículas (v4), agora com o slogan aprovado "A inteligência por trás do próximo passo.", texto de apoio e botões do briefing. A frase que aparece com a rolagem passou a ser "A ORYGEN conecta soluções financeiras, consultoria tributária e tecnologia." (briefing).
- Faixa "A ORYGEN conecta" (desenho da faixa da v4, itens das três frentes).
- Apresentação + "Como trabalhamos" (4 princípios) — referência.
- Três áreas de atuação com links para BaaS, Consultoria tributária e White Label — referência.
- "Quem faz o quê": camadas presas da v4 com o conteúdo de responsabilidades da referência (sua empresa / ORYGEN / instituições parceiras).
- Necessidades empresariais (8 atalhos para as páginas e seções) — referência.
- Fundadores (11+ anos de experiência **dos fundadores**, Douglas Ambiel, Ricardo) — referência/briefing.
- Públicos prioritários — referência.
- "Como começa o relacionamento": régua presa da v4 com as 3 etapas da referência; perguntas da primeira conversa logo abaixo.
- Perguntas frequentes e contato (formulário com área de interesse) — referência.

**Soluções financeiras** (`baas.mjs`): visão geral; produtos em 4 grupos (contas e pagamentos em abas; cobranças e recebimentos; crédito e recebíveis; conta escrow com etapas), com selos de disponibilidade; exemplos ilustrativos por segmento; contratação em 5 etapas (régua presa); papel da ORYGEN e dos parceiros; FAQ; formulário com segmento, faturamento e soluções de interesse.

**BaaS White Label** (`white-label.mjs` + v4): topo com aplicativo de marca fictícia; modelo em 3 camadas (camadas presas da v4 com o texto da referência); aviso sobre a liquidante; o que a plataforma reúne; **troca de marca** e **painel de módulos** da v4 (telas do site anterior, marcadas como ilustrativas); modalidades; implantação em 5 etapas (régua presa); arquitetura e segurança (monólito modular e ISO/IEC 27001 só como referência, sem certificação) com os controles das telas da v4; para quem é; FAQ; formulário com tipo de negócio, base de clientes, estágio, liquidante e integrações.

**Consultoria tributária** (`tributario.mjs`): visão 360°, 6 áreas de atuação (com links para as duas páginas abaixo), quando procurar, como funciona (régua presa), análise individual e o que ter em mãos, reforma tributária, FAQ, formulário tributário.

**Regularização** (`regularizacao.mjs`) e **Recuperação de créditos** (`recuperacao.mjs`): situações comuns / origens, alternativas, etapas (régua presa), o que preparar / cuidados, FAQ com link cruzado, formulário tributário com a necessidade já marcada.

**Privacidade e Termos** (`legal.mjs`): minutas com o aviso "Minuta sujeita à revisão jurídica" e as marcações `[PENDENTE: …]` visíveis. Ajuste feito: o item "origem da visita" foi reescrito como "endereço da página do formulário", porque este site não lê parâmetros de campanha.

### O que saiu da página inicial da v4

- O título "Onde nascem os bancos." e o texto "lançar um banco digital com a própria marca": o briefing pede o slogan aprovado no topo e proíbe apresentar a ORYGEN (ou a compra do software) como banco. Para voltar, basta editar `src/components/Hero.jsx`.
- "Orygen Empresas" (cartões ilustrativos, maquininha, cartão corporativo e a frase sobre "proteção do caixa contra bloqueios e penhoras"): o briefing veta promessas de redução de impostos e de proteção; cartões estão "sob consulta". Os produtos aparecem na página de soluções financeiras.
- "Sobre" com o endereço da Barra da Tijuca e o título "feita no Rio de Janeiro": o endereço está pendente em `config.js` e não é exibido até ser confirmado.
- Painel de módulos, troca de marca e lista de segurança foram para a página **BaaS White Label**.

### Marca

- Símbolo e assinatura usam exatamente os viewBox de `src/brand/symbol_vb.txt` (`-116.6 -62.6 233.2 125.2`) e `lockup_vb.txt` (`-116.6 -62.6 690.8 135.65`), sempre com largura definida e altura automática (sem distorção) e `overflow` visível (o desenho nunca é cortado). Nenhum cartão ou ilustração coloca o símbolo dentro de uma caixa quadrada.

### Verificação

- Build: `npx vite build` (gera `dist/`) e `npx vite build --base=./ --outDir ../artifact-v5` (pré-visualização; `page.html` é cópia de `index.html`).
- Playwright (Chromium), todas as rotas a 1440 px e 390 px, com e sem movimento reduzido: sem erros de console, sem rolagem horizontal, um H1 por página, título e descrição próprios. Também a 360 px em todas as rotas. Testes de menu (mouse e teclado), menu do celular, volta ao topo, links para seções de outras páginas, abas por teclado e validação do formulário. Capturas em `shots-v5/`.

### Pendências (placeholders)

Nada abaixo foi inventado: onde o dado falta, o site omite o elemento ou mostra `[PENDENTE: …]`.

1. **Canais oficiais** (e-mail, telefone, WhatsApp, horário, endereço, LinkedIn/Instagram): preencher `src/config.js`. Hoje contato e rodapé mostram só o formulário.
2. **Destino do formulário** (webhook, CRM ou e-mail): ligar a função `enviar` em `src/components/ui.jsx`. Até lá, o formulário valida os campos e avisa que o envio não está ativo (nada é enviado).
3. **Razão social e CNPJ**: conferir com o cartão CNPJ atual e então marcar `company.verified: true`.
4. **Revisão jurídica** da Política de Privacidade e dos Termos: data de publicação, endereço do controlador, canal de privacidade, bases legais, fornecedores e países, prazo de retenção, encarregado (DPO), limitação de responsabilidade e foro (marcados `[PENDENTE]` nas páginas).
5. **Produtos liberados no lançamento**: campo `status` em `src/pages/Baas.jsx` (hoje só **Cartões** aparece como "Sob consulta").
6. **Conteúdo tributário**: revisão técnica pelo Ricardo (transação, teses citadas, reforma tributária, recuperação de créditos).
7. **Atuação jurídica**: confirmar se medidas administrativas e judiciais serão conduzidas pelo Ricardo ou por sociedade de advogados parceira (texto em `LAWYER_NOTE`, `src/components/Tax.jsx`); observar o Provimento 205/2021 da OAB se houver anúncio de serviços jurídicos.
8. **Fundadores**: sobrenome do Ricardo, fotos e cargos oficiais (hoje "Fundador").
9. **Princípios "Como trabalhamos"**: vêm de valores propostos no branding, ainda sem homologação.
10. **Conta PF**, **link de pagamento** e **máquina de cartão**: confirmar público, meios aceitos, credenciadora e taxas.
11. **Domínio definitivo e indexação**: hoje o site sai com `noindex` (em `index.html` e `config.indexable: false`). No domínio definitivo, troque `indexable` para `true` e remova a linha `robots` de `index.html`.
12. **Botão "Entrar" do painel**: não incluído.

## Versão 4 (out/2026): sóbria, com as animações de rolagem de volta

O visual sóbrio da versão 3 foi mantido: paleta safira, tipografia em peso médio, sem brilhos e sem cores. A pedido do cliente, as animações guiadas pela rolagem voltaram, agora num tom mais discreto:

- **Rolagem suave (Lenis)** está ativa de novo, em `src/pages/Home.jsx`.
- **Topo preso na tela** (`Hero.jsx` + `OGParticles.jsx`), com 230 % da altura da tela no desktop e 200 % no celular:
  - O texto de abertura sai devagar.
  - O símbolo em partículas vai para o centro, gira levemente e se separa em **3 camadas de profundidade**, retomando a ideia das três camadas da plataforma.
  - Em seguida entra a frase "Sua marca na frente. Nossa infraestrutura por trás.". Ela é texto real, sempre lido por leitores de tela.
  - As partículas são monocromáticas, sem onda de luz e sem reação ao cursor.
- **Três camadas presas na tela** (`Layers.jsx`): os planos isométricos se afastam com a rolagem, as linhas da camada de movimentação se desenham, e cada item da lista acende quando a sua camada se separa.
- **Implantação presa na tela** (`Sections.jsx`, `Steps`): uma régua branca se preenche, e cada etapa acende na sua vez (o círculo fica branco e o texto sobe 14 px). Sem glow.
- O progresso de cada seção fica na variável CSS `--p`, calculada em `src/hooks/useSectionProgress.js`. As demais seções mantêm só o fade curto de entrada.
- **Movimento reduzido:** nada fica preso nem anda. O site mostra o estado final (planos abertos, régua completa, frase do topo logo abaixo do texto) e o símbolo parado.
- **Celular:** o topo continua preso. As camadas e a implantação ficam soltas, já no estado aberto, sem rolagem horizontal.

## Versão 3 (out/2026): mais sóbria

Pedido do cliente: "menos carnaval, algo mais sério, mais profissional e elegante".

- **Paleta** só com a família azul safira: Safira `#0C2065`, Noite `#070B1E`, Gelo `#F4F6FB`, Branco, Grafite `#4A5683` e Lavanda `#B9C6FF`. O Azul Elétrico `#2F5BFF` ficou só no anel de foco. Saíram os verdes, amarelos, rosas, brilhos e degradês coloridos.
- **Tipografia:** títulos em peso médio (500), sem misturar negrito e fino. A segunda linha do título usa um tom mais suave (grafite no claro, lavanda no escuro). Cada seção ganhou um rótulo curto em caixa alta, e botões e cartões têm cantos menores.
- **Movimento:** só um fade curto (12 px) quando cada bloco entra na tela. Saíram o letreiro correndo, as órbitas, o brilho que passava nos cartões, as linhas animadas, as seções presas que se abriam com a rolagem e a rolagem suave (Lenis), que voltou na versão 4. Quem pede menos movimento no sistema vê tudo parado.
- **Topo:** o símbolo OG em partículas continua, mas bem mais calmo. É monocromático, sem onda de luz e sem reação ao cursor, e não se desmancha ao rolar. As partículas só assentam no símbolo em cerca de 2 s e depois respiram de leve. Sem WebGL, aparece o símbolo vetorial parado. O texto fica à esquerda e o símbolo à direita, com a frase "Sua marca na frente. Nossa infraestrutura por trás." logo abaixo dele.
- **Seções:** os fundos alternam entre escuro, branco, gelo e safira, com espaçamento igual em todas.
  - O letreiro virou uma faixa fixa, "A plataforma inclui".
  - As três camadas viraram um diagrama parado de três planos sobrepostos.
  - O painel de módulos tem status sem cor (só um ponto) e gráfico em safira e lavanda.
  - As marcas do white label usam tons sóbrios de azul e se diferenciam pelo nome, pela tipografia e pelo monograma.
  - A implantação é uma régua estática de 4 etapas.
  - Os cartões da Orygen Empresas ficaram planos.
  - O rodapé ficou mais compacto.
- O conteúdo, os dados da empresa, o formulário (função `enviar` sem conexão) e os avisos de "dados demonstrativos" continuam iguais.

## Versão 2 (out/2026)

- Visual novo em azul safira, escuro e imersivo, seguindo as referências de heroes animados.
- Topo com o símbolo OG formado por partículas (WebGL/three.js): as partículas se juntam no símbolo ao abrir a página, reagem ao cursor e se abrem em profundidade ao rolar.
- Seções presas na tela que se animam com a rolagem: três camadas e implantação.
- Painel de módulos e troca de marca recriados em código. Todos os dados e marcas são fictícios e aparecem rotulados.
- Sem telas de aplicativo de celular (o produto é o painel web).
- Rolagem suave (Lenis). Quem prefere menos movimento no sistema vê a versão estática.

## Pendências

Ver a lista atualizada em **Versão 5 → Pendências (placeholders)**, acima.

## Versão 6 — identidade própria nas páginas internas

A home ficou como estava. Cada página interna ganhou um topo com uma ilustração animada que explica o assunto da própria página, e uma seção com movimento no meio do conteúdo. Tudo na paleta safira, com dados fictícios ou sem valores, e parado quando o visitante pede movimento reduzido.

| Página | Topo (`src/components/Heroes.jsx`) | Seção com movimento (`src/components/Story.jsx`) |
|---|---|---|
| ORYGEN PAY | **Fluxo**: recebimentos por Pix, boletos, cartões e TED correm por trilhos até a conta da empresa; cada chegada atualiza o saldo e o extrato | **Conta escrow** animada (depósito → verificação de entrega, prazo e documentos → liberação) e **contratação** em linha vertical que acompanha a leitura |
| BaaS White Label | **Planta e marca**, composição centralizada: a planta do aplicativo (tecnologia ORYGEN) recebe, uma após a outra, identidades de marcas fictícias | **Implantação como cronograma**: as frentes se sobrepõem e um cursor avança com a rolagem até o lançamento |
| Consultoria tributária | **Visão 360°**: as seis frentes em volta da empresa, com varredura; cada setor é clicável (regularização e recuperação levam às páginas) | **Reforma tributária** desenhada com a rolagem, de 2026 a 2033 (esquema sem escala, na ordem da EC 132/2023) |
| Regularização | **Do emaranhado ao plano**: linhas dispersas que se organizam por esfera (Receita Federal, PGFN, estados e municípios), em faixa de ponta a ponta | **Etapas empilhadas** como um dossiê |
| Recuperação de créditos | **Cinco anos em revisão**: 60 meses revisados do mais recente ao mais antigo, com os pagamentos a maior somando em créditos | **Etapas empilhadas** |

Arquivos novos: `src/components/Heroes.jsx`, `src/components/Story.jsx`, `src/hooks/useInView.js`. O `PageHero` aceita `layout` (`split`, `center`, `band`), `band` e `variant`.

## Versão 7 — "vida": movimento que responde ao visitante

Nada de estrutura, conteúdo ou paleta mudou. Entrou uma camada de movimento que reage ao tempo, à rolagem e ao cursor:

- **Atmosfera viva:** os fundos escuros ganharam uma luz azul que se move devagar e uma poeira fina (como no manifesto); os fundos claros, uma luz quase imperceptível.
- **Lanterna:** um brilho suave segue o cursor sobre as áreas escuras (invisível no branco).
- **Títulos que se escrevem:** cada título entra palavra por palavra, de baixo para cima.
- **Transição entre páginas:** um véu safira com o símbolo OG cobre a tela e se abre sobre a página nova.
- **Holofote nos cartões:** um foco de luz acompanha o cursor dentro de cada cartão; os cartões em grade entram em sequência.
- **Botões:** inclinam-se levemente na direção do cursor e recebem um brilho ao passar.
- **Ilustrações dos topos:** flutuam devagar e acompanham o cursor em 3D; ao rolar, o topo cede com uma paralaxe leve.
- **Listas:** os fios se desenham e os ✓ são traçados quando aparecem; a faixa "A ORYGEN conecta" acende item a item.
- **Perguntas frequentes:** a resposta abre com suavidade.
- **Cabeçalho:** um fio fino mostra o progresso da leitura.

Tudo é desligado para quem prefere menos movimento (o site fica igual à versão 6.3) e as partes de cursor só existem em telas com mouse.

Para voltar à versão 6.3: ela está guardada em `_ARQUIVO/SITE - versoes antigas/06 SITE - v6.3 (VERSAO SALVA...)`. No código, a camada de vida é `src/lib/life.js` (chamada no `Layout.jsx`) e o bloco "v7 — VIDA" no fim de `src/styles.css`.

## Versão 7.1 — fotografias

Seis fotografias geradas para a marca (hora azul, só a família do safira, sem rostos, textos ou logotipos), em `public/fotos/`. Os originais em PNG estão na pasta `fotos (originais)` da entrega.

| Foto | Onde entra |
|---|---|
| `sao-paulo.jpg` e `rio.jpg` | Home, "Públicos prioritários" (foco comercial inicial) |
| `galpao.jpg` | ORYGEN PAY, antes dos exemplos de aplicação |
| `celular.jpg` | White Label, antes das modalidades |
| `tech.jpg` | White Label, antes de arquitetura e segurança |
| `sala.jpg` | Consultoria tributária, antes de "Quando procurar" |

As faixas (`src/components/Photo.jsx`) têm paralaxe leve e entram com um fade. Para trocar uma foto, basta substituir o arquivo em `public/fotos/` mantendo o nome.

## Versão 7.3 — o manifesto na home

Bloco "O manifesto" logo depois da apresentação. A capa é um trecho silencioso da abertura (loop leve); o filme (61 s, com som) só começa ao apertar o play.

- Arquivos em `public/video/`: `manifesto.mp4` (H.264, ~10 MB) e `manifesto.webm` (VP9, ~10 MB), `capa-loop.mp4/.webm` (6 s, sem som) e `poster.jpg`.
- Para hospedar o vídeo fora (Vimeo ou YouTube), cole o link de incorporação em `config.manifesto.embed` (`src/config.js`); o site passa a usar o player externo e não carrega os arquivos locais.
