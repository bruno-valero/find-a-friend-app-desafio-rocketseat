-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('USER', 'ORG');

-- CreateEnum
CREATE TYPE "STATE" AS ENUM ('AM', 'PA', 'RR', 'AP', 'AC', 'RO', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF');

-- CreateEnum
CREATE TYPE "PET_MAIN_CHARCTERISTICS" AS ENUM ('Leal', 'brincalhao', 'necessita_de_exercicio_regular', 'Independente', 'limpo', 'pode_ser_afetuoso', 'tamanho_medio', 'Relativamente_facil_de_cuidar', 'silencioso', 'Pode_ser_cantante', 'requer_interacao', 'tamanho_pequeno', 'Pequeno', 'atividade_noturna', 'vive_em_gaiolas', 'requer_rodinha_para_exercicio', 'Sociavel', 'requer_ambiente_especifico', 'Longa_expectativa_de_vida', 'facil_de_cuidar', 'Requer_habitat_especifico', 'venenoso', 'Ativo', 'curioso', 'necessita_de_espaco_para_brincar', 'noturno', 'pode_ser_treinado', 'Variedade_de_especies', 'dieta_especifica', 'Diversidade_de_especies', 'nao_venenoso', 'terrestre', 'pode_ser_treinado_para_falar', 'diurno', 'Inteligente', 'requer_interacao_social', 'requer_estimulacao', 'Cantante', 'relativamente_facil_de_cuidar', 'ativo', 'necessita_de_ambiente_com_espaco_para_cavar', 'Aquatico', 'sensivel_a_qualidade_da_agua', 'Silenciosa');

-- CreateEnum
CREATE TYPE "PET_COLOR" AS ENUM ('preto', 'marrom', 'branco', 'cinza', 'amarelo', 'listrado', 'laranja', 'vermelho', 'verde', 'azul', 'dourado');

-- CreateEnum
CREATE TYPE "PET_TYPE" AS ENUM ('Cachorro', 'Gato', 'Peixe', 'Passaro', 'Hamster', 'Coelho', 'Tartaruga', 'Porquinho_da_india', 'Cobra', 'Furao', 'Chinchila', 'Rato', 'Lagarto', 'Ourico', 'Aranha', 'Sapo', 'Periquito', 'Papagaio', 'Canario', 'Gerbil', 'Axolote', 'Tarantula');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "ROLE" NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "cep" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" "STATE" NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "main_characteristics" "PET_MAIN_CHARCTERISTICS"[],
    "color" "PET_COLOR" NOT NULL,
    "type" "PET_TYPE" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "cep" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" "STATE" NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
