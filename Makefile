.PHONY: help install dev build lint format test test-watch check-traceability check docker-dev docker-build docker-down

CYAN := \033[36m
RESET := \033[0m

help: ## Exibe a lista de comandos disponíveis
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(CYAN)%-20s$(RESET) %s\n", $$1, $$2}'

install: ## Instala dependências do projeto
	npm install

dev: ## Inicia o servidor local de desenvolvimento
	npm run dev

build: ## Executa o build de produção
	npm run build

lint: ## Executa a verificação estática de tipos (TypeScript)
	npm run lint

test: ## Executa os testes unitários (Vitest)
	npm run test

test-watch: ## Executa testes em modo watch
	npm run test:watch

check-traceability: ## Gera e verifica a matriz de rastreabilidade (SDD)
	python3 scripts/generate_traceability.py

check: lint test check-traceability ## Executa todos os Quality Gates locais

docker-dev: ## Inicia o ambiente de desenvolvimento em container Docker
	docker compose up

docker-down: ## Para os containers Docker
	docker compose down

docker-build: ## Constrói a imagem Docker de produção com Nginx
	docker build -t epmdevtech-planos:latest .
