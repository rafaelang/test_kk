# Sobre o Projeto

Este projeto utiliza o framework NestJS para construir uma API robusta e escalável. Ele foi desenvolvido com foco em boas práticas de arquitetura, modularidade e facilidade de manutenção. O ambiente de desenvolvimento é containerizado utilizando Docker, facilitando a configuração e o deploy em diferentes ambientes.

## Documentação das APIs

Este projeto utiliza Swagger para documentação automática da API. Todas as rotas e endpoints são gerados e exibidos via Swagger, permitindo fácil visualização e testes das funcionalidades disponíveis diretamente pela interface web.

### Boas Práticas nos Clients: Timeout e MaxRetries

Os clients utilizados para comunicação entre serviços implementam configurações de `timeout` e `maxRetries`. Essas práticas garantem maior resiliência e controle sobre as requisições, evitando bloqueios prolongados e permitindo tentativas automáticas em caso de falhas temporárias. Isso contribui para a estabilidade e confiabilidade do sistema, especialmente em ambientes distribuídos.

### Validação de Entradas dos Endpoints

Todos os endpoints da API possuem validação rigorosa das entradas utilizando os pipes de validação do NestJS. Isso garante que os dados recebidos estejam no formato esperado, evitando erros e aumentando a segurança da aplicação.

## Broker para operações com carrinho

As operações de adicionar e remover produto do carrinho utilizam um broker Kafka para comunicação assíncrona entre os serviços. Essa abordagem oferece diversas vantagens, como:

- **Escalabilidade:** Permite que múltiplos serviços processem eventos de forma independente, facilitando o crescimento do sistema.
- **Desacoplamento:** Os serviços não dependem diretamente uns dos outros, tornando a arquitetura mais flexível e de fácil manutenção.
- **Resiliência:** O uso de filas garante que eventos não sejam perdidos, mesmo em caso de falhas temporárias nos consumidores.
- **Performance:** Processamento assíncrono reduz o tempo de resposta das APIs, melhorando a experiência do usuário.

Essa integração garante maior robustez e flexibilidade para o gerenciamento do carrinho de compras.

## Migrations do TypeORM

O microserviço `cart-microservice` utiliza migrations do TypeORM para gerenciar e versionar alterações no banco de dados de forma segura e automatizada. Isso garante consistência nas estruturas das tabelas e facilita o controle de mudanças durante o desenvolvimento e deploy.

## Uso de DTOs e DAOs

O projeto adota o padrão de Data Transfer Objects (DTOs) para definir e validar os dados trafegados entre as camadas da aplicação, garantindo clareza e segurança nas informações recebidas e enviadas pelas APIs. Além disso, utiliza Data Access Objects (DAOs) para abstrair o acesso ao banco de dados, promovendo separação de responsabilidades e facilitando a manutenção do código.

### Vantagens dessa abordagem

- **Organização:** Mantém o código mais limpo e estruturado, separando regras de negócio, validação e persistência de dados.
- **Reusabilidade:** DTOs e DAOs podem ser reutilizados em diferentes partes do sistema, reduzindo duplicidade.
- **Facilidade de testes:** A separação das camadas facilita a criação de testes unitários e de integração.
- **Segurança:** Garante que apenas os dados esperados sejam processados, evitando inconsistências e vulnerabilidades.
- **Manutenção:** Torna o sistema mais flexível para evoluções futuras, permitindo alterações pontuais sem impacto global.

# Arquitetura
![Diagrama de Arquitetura](docs/images/arquitetura_v1.png)

## Proposta de evolução
![Diagrama de Arquitetura v2](docs/images/arquitetura_v2.png)


# Stack
| Tool      | Version   |
|-----------|-----------|
| NVM       | 0.40.3    |
| Node.js   | 22 LTS    |
| NPX       | 10.9.3    |
| NPM       | 11.6.1    |

# TODOs

- [ ] Autenticação
- [ ] Testes

# Desenvolvimento

### MongoDB

O serviço MongoDB é utilizado pelo projeto Cart Microservice, com usuário e senha mongouser e mongopass respectivamente. Os dados são salvos em um volume persistente e o banco fica disponível na porta padrão 27017.

### Mongo Express

O serviço Mongo Express oferece uma interface web para gerenciar o banco MongoDB de forma simples e intuitiva. Ele roda na porta 8081 e permite visualizar, editar e excluir documentos, além de executar consultas diretamente pelo navegador. O acesso é protegido por autenticação básica, com usuário e senha mexpress_user e mexpress_pass respectivamente.

### PostgreSQL

O serviço PostgreSQL utiliza a imagem oficial `postgres:15-alpine` e é configurado com usuário, senha e banco de dados específicos para o projeto Product Microservice. Os dados são persistidos em um volume dedicado e o banco está acessível pela porta padrão 5432.

### Redis Service

O serviço Redis é utilizado como armazenamento em memória e cache, proporcionando alta performance para operações rápidas e temporárias. Ele roda na porta 6379, garantindo maior confiabilidade em cenários de reinicialização. Ideal para cache de dados frequentemente acessados.

### Kafdrop Service (Kafka Web UI)

O serviço Kafdrop utiliza a imagem oficial `obsidiandynamics/kafdrop:latest` e oferece uma interface web para visualizar e gerenciar tópicos, mensagens e consumidores do Kafka. Ele conecta-se ao broker Kafka pelo endereço interno `kafka:9092` e expõe a interface web na porta 9000 do host. O Kafdrop facilita o monitoramento e depuração das operações do Kafka no ambiente de desenvolvimento.


## Project Cart Microservice


```sh
git clone git@github.com:rafaelang/<repo>.git
cd <project>
cd cart-microservice
nvm use
npm install
echo "DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=product_db_user
DB_PASSWORD=product_db_password
DB_DATABASE=product_db
CART_API_PORT=3002
KAFKA_BROKERS=localhost:9094
KAFKA_GROUP_ID=cart-service-group
PRODUCT_API_URL=http://localhost:3001" > .env
npm run migration:run
npm run start:dev
```

## Project Product Microservice

```sh
git clone git@github.com:rafaelang/<repo>.git
cd <project>
cd product-microservice
nvm use
npm install
echo "MONGODB_URI=mongodb://mongouser:mongopass@localhost:27017/product_microservice?authSource=admin
PRODUCT_API_PORT=3001" > .env
npm run start:dev
```

## Project Front API Gateway

```sh
git clone git@github.com:rafaelang/<repo>.git
cd <project>
cd product-microservice
nvm use
npm install
echo "FRONT_API_PORT=3000
PRODUCT_API_URL=http://localhost:3001
CART_API_URL=http://localhost:3002
CART_KAFKA_BROKERS=localhost:9094
CART_BROKER_CONSUMER_GROUP=apigatewaycart-service-group
CART_BROKER_CLIENT_ID=apigateway-cart-service" > .env
npm run start:dev
```
