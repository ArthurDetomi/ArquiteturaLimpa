# Clean Architecture - Projeto de Estudos

> Este projeto foi desenvolvido durante meus estudos sobre **Clean Architecture (Arquitetura Limpa)** e **Arquitetura Hexagonal (Ports and Adapters)**.
>
> Mais do que um projeto de exemplo, este repositório serve como um material de consulta para revisar os principais conceitos da arquitetura e entender como aplicá-los na prática.

---

# O que é Arquitetura Limpa?

A Arquitetura Limpa é uma forma de organizar um sistema para que as **regras de negócio sejam independentes da tecnologia**.

Isso significa que o domínio da aplicação não deve depender de:

- Banco de dados
- Frameworks
- APIs externas
- Interface gráfica
- Bibliotecas
- Serviços de terceiros

O domínio deve ser capaz de sobreviver mesmo que toda a infraestrutura seja substituída.

Como diz Robert C. Martin:

> O objetivo da arquitetura de software é minimizar os recursos humanos necessários para construir e manter um sistema.

Em outras palavras:

> **Tecnologias mudam. A regra de negócio permanece.**

---

# Princípios Fundamentais

A Arquitetura Limpa utiliza diversos princípios de engenharia de software, porém dois deles são essenciais para sua implementação.

## Inversão de Dependência (Dependency Inversion Principle)

O domínio nunca depende de implementações.

Ele depende apenas de abstrações.

Errado:

```text
LoginUsuario

↓

RepositorioUsuarioMySql
```

Correto:

```text
LoginUsuario

↓

RepositorioUsuario (interface)

↑

RepositorioUsuarioMySql
```

O Caso de Uso nunca sabe qual banco está utilizando.

---

## Polimorfismo

O polimorfismo permite trocar implementações sem alterar os Casos de Uso.

Hoje:

```text
RepositorioUsuarioMySql
```

Amanhã:

```text
RepositorioUsuarioMongo
```

Depois:

```text
RepositorioUsuarioApi
```

O Caso de Uso continua exatamente igual.

---

# Regra da Dependência

A regra mais importante da Arquitetura Limpa é:

> **Todas as dependências apontam para o domínio.**

Nunca o contrário.

```text
             external
                 │
                 ▼
         Casos de Uso
                 │
                 ▼
             Entidades
```

O domínio nunca conhece:

- Express
- MySQL
- JWT
- HTTP
- React
- Docker
- Frameworks

Ele conhece apenas regras de negócio.

---

# Estrutura deste Projeto

```text
src
│
├── core
│   ├── fundamentos
│   ├── produto
│   ├── shared
│   └── usuario
│
└── external
    ├── api
    ├── auth
    └── db
```

A ideia é simples:

```text
core
↓
Regra de negócio

external
↓
Tecnologia
```

---

# Core

O **core** representa o coração da aplicação.

Tudo que representa regra de negócio fica aqui.

O core pode ser reutilizado em qualquer aplicação independentemente da tecnologia utilizada.

---

# core/shared

Contém componentes compartilhados por toda a aplicação.

```
CasoDeUso.ts
```

Interface base para todos os Casos de Uso.

Exemplo:

```ts
interface CasoDeUso<I, O> {
    executar(entrada: I): Promise<O>;
}
```

Todos os Casos de Uso seguem o mesmo padrão.

---

```
Id.ts
```

Objeto responsável por representar identificadores da aplicação.

---

```
Erros.ts
```

Centraliza exceções compartilhadas.

---

# core/usuario

Representa o domínio de usuários.

Estrutura:

```text
usuario
│
├── model
│
└── service
```

---

## model

```
Usuario.ts
```

Representa a entidade.

A entidade representa conceitos do negócio.

Ela deve proteger seu próprio estado.

Sempre que uma regra altera apenas um usuário, ela normalmente pertence à entidade.

---

## service

Contém os Casos de Uso e as Portas.

```
RegistrarUsuario.ts
```

Caso de Uso responsável por cadastrar usuários.

---

```
LoginUsuario.ts
```

Caso de Uso responsável pela autenticação.

---

```
RepositorioUsuario.ts
```

Representa uma **Porta (Port)**.

Ele define o contrato.

Exemplo:

```text
buscarPorId()

buscarPorEmail()

salvar()
```

Ele nunca conhece MySQL.

---

```
ProvedorCriptografia.ts
```

Também representa uma Porta.

O Caso de Uso apenas sabe que precisa:

```text
criptografar()

comparar()
```

Quem realiza isso é outra classe.

---

# core/produto

Segue exatamente a mesma ideia.

```text
Produto

↓

Caso de Uso

↓

Porta
```

Cada módulo do domínio deve ser independente.

---

# core/fundamentos

Contém pequenos exemplos criados durante os estudos.

```text
Carro

Ferrari

Fusca

Civic
```

Seu objetivo é demonstrar principalmente o uso do **polimorfismo**.

---

# External

Tudo que depende de tecnologia fica nesta camada.

Nada dentro do **core** conhece essas implementações.

---

# external/api

Contém a camada HTTP.

```text
Controller

↓

Caso de Uso

↓

Resposta HTTP
```

Responsabilidades:

- receber requisições;
- validar entradas;
- chamar Casos de Uso;
- retornar respostas.

Controllers **não possuem regra de negócio**.

---

# external/auth

Implementações relacionadas à autenticação.

Exemplos:

```text
SenhaCripto

EspacoSenhaCripto

InverterSenhaCriptografia
```

Essas classes implementam:

```text
ProvedorCriptografia
```

O Caso de Uso nunca conhece essas implementações.

---

# external/db

Contém implementações relacionadas ao banco de dados.

Exemplos:

```text
RepositorioUsuarioMySql

RepositorioUsuarioEmMemoria
```

Ambos implementam:

```text
RepositorioUsuario
```

Isso permite trocar completamente a tecnologia sem alterar o domínio.

---

# Fluxo de uma Requisição

O fluxo completo da aplicação é:

```text
Cliente

↓

Controller

↓

Caso de Uso

↓

Entidade

↓

Porta

↓

Adapter

↓

Banco de Dados
```

A resposta retorna pelo caminho inverso.

---

# Como identificar uma Entidade?

Uma entidade representa um conceito importante do domínio.

Exemplos:

- Usuário
- Produto
- Pedido
- Cliente
- Conta

Ela possui identidade própria e normalmente protege seu estado.

---

# Como identificar um Caso de Uso?

Um Caso de Uso representa uma funcionalidade da aplicação.

Pergunta:

> **O que o usuário deseja fazer?**

Exemplos:

- Registrar usuário
- Fazer login
- Buscar produto
- Criar pedido
- Cancelar compra

Cada funcionalidade normalmente gera um Caso de Uso.

---

# Como identificar uma Porta?

Sempre que o domínio precisar conversar com algo externo.

Exemplos:

- Banco de Dados
- Email
- WhatsApp
- Cache
- JWT
- IA
- API externa

O domínio nunca conhece essas implementações.

Ele conhece apenas interfaces.

---

# Como identificar um Adapter?

Sempre que alguma tecnologia implementar uma Porta.

Exemplo:

```text
RepositorioUsuario

↓

RepositorioUsuarioMySql
```

ou

```text
RepositorioUsuario

↓

RepositorioUsuarioEmMemoria
```

O domínio permanece exatamente igual.

---

# Como adicionar uma nova funcionalidade?

Sempre sigo esta sequência.

## 1

Identificar o problema de negócio.

↓

Criar um Caso de Uso.

---

## 2

Quais entidades participam?

↓

Criar ou reutilizar entidades.

---

## 3

O Caso de Uso precisa acessar algo externo?

↓

Criar uma Porta.

---

## 4

Criar um Adapter que implemente essa Porta.

---

## 5

Criar um Controller para expor a funcionalidade.

---

# Exemplo utilizando este projeto

## Cadastro de usuário

```text
HTTP Request

↓

RegistrarUsuarioController

↓

RegistrarUsuario

↓

RepositorioUsuario

↓

RepositorioUsuarioMySql

↓

MySQL
```

---

## Login

```text
HTTP Request

↓

LoginUsuarioController

↓

LoginUsuario

↓

RepositorioUsuario

↓

ProvedorCriptografia

↓

SenhaCripto
```

---

## Buscar Produto

```text
HTTP Request

↓

ObterProdutoPorIdController

↓

ObterProdutoPorId

↓

Produto
```

---

# Como saber onde colocar um código?

Sempre faço esta pergunta:

## Isso é uma regra de negócio?

Se sim:

```text
core
```

Se não:

```text
external
```

---

## Isso depende de tecnologia?

Se sim:

```text
external
```

---

## Isso pode mudar quando eu trocar de banco?

Se sim:

Interface + Adapter.

---

## Isso protege uma entidade?

Se sim:

Provavelmente pertence à própria entidade.

---

# Checklist

Antes de terminar uma funcionalidade, verificar:

- [ ] Existe alguma regra de negócio dentro do Controller?
- [ ] Meu Caso de Uso conhece Express?
- [ ] Meu Caso de Uso conhece MySQL?
- [ ] Meu Caso de Uso conhece JWT?
- [ ] Existe alguma dependência externa sem interface?
- [ ] Posso trocar o banco sem alterar o Caso de Uso?
- [ ] Posso testar meu Caso de Uso utilizando um repositório em memória?
- [ ] Minha entidade protege seu próprio estado?
- [ ] Estou programando para abstrações?

---

# Resumo Mental

Sempre lembrar:

```text
                Domínio

             Entidades

                  ▲

             Casos de Uso

                  ▲

          Interfaces (Ports)

────────────────────────────────────

       Controllers

       Banco de Dados

       JWT

       APIs

       Cache

       Email

       IA

       WhatsApp

Implementações (Adapters)
```

---

# Minha definição de Arquitetura Limpa

> Arquitetura Limpa é uma forma de organizar o sistema para que as regras de negócio permaneçam independentes da tecnologia. Isso é alcançado utilizando abstrações, Inversão de Dependência e Polimorfismo. O domínio define os contratos (Ports) e a infraestrutura fornece as implementações (Adapters), permitindo evoluir ou substituir tecnologias sem modificar os Casos de Uso e as Entidades.

---

# Referências

- Robert C. Martin — *Clean Architecture*
- Alistair Cockburn — *Hexagonal Architecture*
- Eric Evans — *Domain-Driven Design*
