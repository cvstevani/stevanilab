# Arquitetura proposta para QFL1605

## Situação atual

O StevaniLab usa React, Vinext e rotas de servidor. A página pública da QFL1605 já reúne conteúdo institucional, mapas, docentes, parceiros e acessos protegidos por códigos temporários. Os questionários e a área de trabalho apontam para serviços do Google Drive. A camada Drizzle existe, mas o esquema de dados ainda está vazio.

## Separação recomendada

1. **Portal público**
   Mantém a rota atual `/education/qfl1605`, sem dados pessoais ou dados científicos não aprovados.

2. **Aplicativo instalável**
   Começa como PWA responsiva para iOS e Android. A aplicação oferece protocolos, amostras, medições, cálculos, avaliações e fila de sincronização.

3. **Serviço de dados**
   API autenticada, banco relacional central, armazenamento de arquivos e trilha de auditoria imutável. O Google Drive permanece como repositório de documentos e exportações aprovadas, não como banco transacional.

4. **Administração**
   Professores controlam turmas, grupos, protocolos, permissões, moderação de avaliações e exportações.

## Modelo de dados futuro

- usuários, papéis, turmas e grupos
- locais, atividades e versões de protocolos
- amostras e identificadores únicos
- medições brutas, unidades, réplicas e fatores de diluição
- resultados calculados com versão da fórmula
- revisões e eventos de auditoria
- avaliações anônimas ou identificadas opcionalmente
- anexos e exportações para o Google Drive

## Estratégia offline

- IndexedDB mantém sessão local, protocolo, amostras, medições e avaliações.
- Cada alteração recebe identificador, revisão, horário do dispositivo e estado de sincronização.
- Uma fila envia alterações quando a conexão retorna.
- O servidor confirma as revisões recebidas e resolve conflitos sem apagar os dados brutos.
- O histórico permanece somente de acréscimo. Correções geram novas revisões.

## Segurança da versão de produção

- autenticação individual e associação explícita a turma e grupo
- autorização no servidor para cada leitura e escrita
- criptografia em trânsito e proteção dos segredos no provedor
- banco central com cópias de segurança e políticas por linha
- registros de auditoria sem edição retroativa
- formulários públicos com identificadores de campanha, limitação de abuso e moderação
- minimização de dados pessoais e consentimento adequado

## Limites do protótipo

O protótipo usa identificação local e um endpoint de sincronização temporário sem persistência central durável. Ele serve para validar instalação, uso offline, fluxo de campo, cálculo, histórico e experiência em iOS e Android. Não deve receber dados pessoais ou científicos reais antes da implantação da autenticação e do banco central.

## Destino Google da avaliação final

O formulário oficial é `QFL1605 · Avaliação das atividades de campo`, identificado no Google Drive por `1eIANuMWyKt_wH2h4dfLBVDWDuDKNrVU6OtgfMaw42yI`.

A API oficial do Google Forms permite ler respostas, mas não criar respostas de participantes. Por isso, a sincronização de avaliações registradas offline deverá usar uma ponte autenticada do Google Apps Script para acrescentar os registros à planilha de respostas da disciplina. O endereço dessa ponte será configurado no servidor como `QFL1605_GOOGLE_SYNC_URL` e sua credencial como `QFL1605_GOOGLE_SYNC_SECRET`.

Enquanto essa ponte não estiver configurada e não confirmar a gravação, o aplicativo mantém os dados na fila local e não os marca como sincronizados.

## Avaliações por público

- `QFL1605 · Avaliação das atividades de campo`: avaliação final dos estudantes matriculados, dentro da área do aplicativo.
- `PETAR · Guias e monitores`: formulário em português distribuído pela equipe.
- `PETAR · Estudantes de escolas`: formulário em português distribuído pela equipe.
- `PETAR · Turistas e visitantes`: formulário bilíngue distribuído pela equipe.

Os três formulários do PETAR possuem uma entrada própria não indexada em `/education/qfl1605/prototipo/avaliacoes`. O portal público descreve a metodologia, mas não fornece acesso direto aos questionários.

Cada participante envia uma única avaliação. Locais e atividades são campos de seleção múltipla. A opção `Outro local` exige o nome do local, e observações específicas devem identificar o local e a atividade mencionados.

## Administração e publicação

A rota `/education/qfl1605/prototipo/admin` reúne os acessos docentes às pastas do Google Drive. Durante a validação, ela usa um código temporário independente. Antes de receber dados reais, deverá ser substituída por autenticação individual e lista explícita de contas docentes autorizadas.

O portal público apresenta somente o projeto e resultados agregados aprovados. Nenhuma resposta individual é publicada automaticamente.
