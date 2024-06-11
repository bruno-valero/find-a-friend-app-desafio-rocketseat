# FindAFriend API - Desafio Rocketseat

Nesse desafio desenvolveremos uma API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

## Requisitos Funcionais

- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [ ] Deve ser possível se cadastrar como uma ORG
- [ ] Deve ser possível realizar login como uma ORG

## Regras de Negócio

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Requisitos Não Funcionais

- [ ] Os dados deverão ser persistidos num banco de dados postgreSQL
- [ ] O Banco de dados em desenvolvimento deve ser usado através de um container do Docker
- [ ] Devem haver testes unitários e testes e2e para validar os requisitos e as regras de negócio
- [ ] Deve ser implementado o CI (Continuous Integration)
- [ ] CI - ao realizar um **push** para o github, todos os tests unitários devem ser executados
- [ ] CI - ao realizar um **pull request** para o github, todos os tests e2e devem ser executados
- [ ] O projeto dev seguir a metodologia DDD (Domain-Driven Design)

## Metodologia Domain-Driven Design

- [ ] domains:
  - [ ] find a friend
    - [ ] application
      - [ ] repositories
        - [ ] pets repository
        - [ ] users repository
    - [ ] enterprise
      - [ ] entities:
        - [ ] basic user
        - [ ] org
        - [ ] pet
