# FindAFriend API - Desafio Rocketseat

Nesse desafio desenvolveremos uma API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

### Setup em desenvolvimento

Para rodar este server em desenvolvimento, certifique-se de ter as seguintes dependências instaladas no seu computador:

- [git](https://git-scm.com/downloads) - permite realizar versionamento de código e a comunicação com o github.

- [docker](https://docs.docker.com/get-docker/) - permite a conteinerização, que é criar e disponibilizar **micro máquinas virtuais com somente o necessário para que o serviço escolhido funcione**. Neste caso, o [docker](https://docs.docker.com/get-docker/) será utilizado para subir o banco de dados postgreSQL em desenvolvimento.

- [nodeJS](https://nodejs.org/en) - permite executar javaScript em um ambiente de servidor

Após verificar que todos os requisitos acima estão disponíveis, faça o clone do meu repositório hospedado no github e rode o projeto.

#### Sequência de comandos

Primeiro inicie o git

```bash
git init
```

Clone o repositório

```bash
git clone https://github.com/bruno-valero/find-a-friend-app-desafio-rocketseat
```

Entre na pasta do projeto

```bash
cd find-a-friend-app-desafio-rocketseat
```

Certifique-se que o docker está ativo, então execute o comando

```bash
npm run dev:new-setup
```

Observe os logs que aparacerão no terminal. Quando aparecer `app running on 3000`, você já pode começar a realizar as requisições http

#### Ver alterações no postgreSQL

Quando você começar a fazer as requisições, novos dados serão inseridos, trocados ou retirados do banco de dados. para consultar essas mudanças, abra outro terminal dentro da pasta do projeto, ou seja, dentro de `caminho/ate/find-a-friend-app-desafio-rocketseat`. Quando o terminal estiver aberto dentro desta pasta, execute o comando:

```bash
npm run db
```

O comando acima abrirá uma janela no eu navegador, mostrando as tabela do banco de dados e seu conteúdo.

#### Futuros testes na mesma pasta

Agora que você já executou `npm run dev:new-setup`, caso vá rodar o servidor futuramente na mesma pasta, não há necessidade de usar o mesmo comando. Em vez disso execute:

```bash
npm run dev
```

### Fazendo requisições http

Se você tiver a extensão do vscode **REST Client**, pode usar o arquivo [`./client.http`](https://github.com/bruno-valero/find-a-friend-app-desafio-rocketseat/blob/main/client.http), ele já tem todas as possíveis rotas disponíveis. Basta trocar os dados que serão enviados para testar.

Ou você pode usar um programa como o [Insomnia](https://insomnia.rest/download), um aplicativo desktop multiplataforma que permite fazer solicitações HTTP e testar APIs.

## Construção do Projeto

A seguir estarão disponíveis as informações relacionadas ao desenvolvimento do projeto, como requisitos funcionais, regras de negócio, requisitos não funcionais e a estrutura proveniente da metodologia DDD (Domain-Driven Design)

### Requisitos Funcionais

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Regras de Negócio

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

### Requisitos Não Funcionais

- [x] Os dados deverão ser persistidos num banco de dados postgreSQL
- [x] O Banco de dados em desenvolvimento deve ser usado através de um container do Docker
- [x] Devem haver testes unitários e testes e2e para validar os requisitos e as regras de negócio
- [ ] Deve ser implementado o CI (Continuous Integration)
- [ ] CI - ao realizar um **push** para o github, todos os tests unitários devem ser executados
- [ ] CI - ao realizar um **pull request** para o github, todos os tests e2e devem ser executados
- [x] O projeto dev seguir a metodologia DDD (Domain-Driven Design)

### Metodologia Domain-Driven Design

- [x] domains:
  - [x] find a friend:
    - [x] application:
      - [x] repositories:
        - [x] pets repository
        - [x] users repository
      - [x] use cases:
        - [x] register org
        - [x] authenticate org
        - [x] register pet
        - [x] fetch all adoptable pet
        - [x] find pet
        - [x] want to adopt
    - [x] enterprise:
      - [x] entities:
        - [x] org
        - [x] pet
