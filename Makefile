# Add markers to track installations.
BACKEND_DEPS := backend/venv/.installed
FRONTEND_DEPS := frontend/node_modules/.installed

# Display help information from comments beginning with '##`.
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(shell tput setaf 6)%-10s$(shell tput sgr0) %s\n", $$1, $$2}'

install: $(BACKEND_DEPS) $(FRONTEND_DEPS) ## Install frontend and backend dependencies
	@echo
	@echo " 🚀 All dependencies installed. Run 'make run' to start the project."

# Install backend deps and mark them installed.
$(BACKEND_DEPS): backend/requirements.txt
	@echo "backend: install deps"
	cd backend && python -m venv venv && venv/bin/pip install -r requirements.txt
	touch $@

# Install frontend deps and mark them installed.
$(FRONTEND_DEPS): frontend/package.json
	@echo "frontend: install deps"
	cd frontend && npm install
	touch $@

run: ## Run frontend and backend dev servers
	(cd backend && exec venv/bin/python app.py) &
	cd frontend && exec npm run dev

clean: ## Clean up installed files to reset project
	@rm -rf backend/venv -rf
	@rm -rf frontend/node_modules -rf
