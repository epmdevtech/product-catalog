.PHONY: help install dev build lint format test test-e2e check-traceability check

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

lint: ## Executa a verificação estática de código (ESLint e TypeScript)
	npm run lint
	npx tsc --noEmit

format: ## Formata o código com Prettier
	npm run format

test: ## Executa os testes unitários (Vitest)
	npm run test

test-e2e: ## Executa os testes de ponta a ponta (Playwright)
	npx playwright test

check-traceability: ## Gera e verifica a matriz de rastreabilidade (SDD)
	python3 scripts/generate_traceability.py

check: lint test check-traceability ## Executa todos os Quality Gates
