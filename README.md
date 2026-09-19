# Harness

A visual AI workflow builder. Draw a flow — `Start → API (LLM) → End` — and run a prompt through it without writing glue code.

**Status:** early prototype / learning project. The happy-path flow works, but expect rough edges (see [Known limitations](#known-limitations)).

## What it actually is

- **Frontend (`my-app/`, Next.js 16 + React 19 + `@xyflow/react`):** an infinite canvas where you add nodes from a sidebar and connect them with edges.
  - `StartNode` — text input + `RUN` button. Holds the prompt.
  - `ApiNode` — labelled "LLM Gateway". Intended to call an LLM with the prompt.
  - `EndNode` — displays the result (`No output yet...` until a run finishes).
  - State (`nodes`, `edges`) lives in `app/page.tsx`, is synced to the backend on every change (`POST /user`, `POST /edges`), and execution is triggered via `WorkflowContext.runWorkflow()` (`POST /run`).
- **Backend (`backend/`, FastAPI + Uvicorn + Groq):** receives the graph JSON, walks it edge-by-edge starting from the first node, calls Groq (`llama-3.3-70b-versatile` in `apirun.py`) when it hits an `ApiNode`, and returns the answer.
  - `app.py` — FastAPI app + CORS (allows `http://localhost:3000`) + routes.
  - `run_ui.py:runui()` — current executor: linear walk `StartNode → … → EndNode`.
  - `execute_transversal.py:edgesort()` — debug/printing helper for edges.
  - `Execution_nodes/` — WIP graph helpers (`Edge_graph.py`, `node_map.py`, `engine.py`).

**Purpose:** learn full-stack AI orchestration by building a minimal LangChain-/Flowise-style "harness": visual graph on the client, graph traversal + LLM call on the server.

## How a run works

1. User drops `Start`, `API`, `End` nodes and connects them in the UI.
2. `page.tsx` POSTs `nodes` → `http://localhost:8000/user` and `edges` → `http://localhost:8000/edges` (fire-and-forget sync).
3. User types a prompt in `StartNode`, clicks `RUN`.
4. `WorkflowContext` POSTs `{ value, edges, nodes }` → `POST /run`.
5. `run_ui.runui()` follows `edges` from `nodes[0]` until `EndNode`, calling `run_ai(prompt)` (Groq) at each `ApiNode`.
6. Backend returns `{ "running": <llm-text> }`; frontend stringifies it into `EndNode` output.

## Prerequisites

- Node.js 20+ and npm
- Python 3.10+ (3.11/3.12 fine)
- A [Groq](https://console.groq.com/) API key

## Quickstart

### 1. Backend (FastAPI, port 8000)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create `backend/.env`:

```ini
GROQ_API_KEY=gsk_your_key_here
```

Run (from inside `backend/` — imports are relative, so cwd matters):

```powershell
python app.py
# or: uvicorn app:app --reload --port 8000
```

Health check: open `http://127.0.0.1:8000/docs` (auto-generated Swagger UI).

### 2. Frontend (Next.js, port 3000)

In a second terminal:

```powershell
cd my-app
npm install
npm run dev
```

Open `http://localhost:3000`. The backend must already be running, otherwise the `fetch(http://localhost:8000/…)` calls in `page.tsx` / `WorkflowContext.tsx` will fail (check browser devtools console).

Other scripts (from `my-app/`):

```powershell
npm run build   # production build
npm run start   # serve production build (needs `build` first)
npm run lint    # eslint
```

## API reference (backend)

| Method | Path     | Body                       | What it does today              |
| ------ | -------- | -------------------------- | ------------------------------- |
| POST   | `/user`  | `{ "flow": Node[] }`       | Logs nodes, returns received    |
| POST   | `/edges` | `{ "flow": Edge[] }`       | Logs edges via `edgesort()`     |
| POST   | `/values`| `{ …any }`                 | Logs payload, returns got it    |
| POST   | `/run`   | `{ value, edges, nodes }`  | Executes graph + Groq call      |

Example `/run` call:

```powershell
Invoke-RestMethod -Uri http://localhost:8000/run -Method Post `
  -ContentType "application/json" `
  -Body '{"value":"Hello","nodes":[{"id":"0","type":"StartNode"},{"id":"1","type":"ApiNode"},{"id":"2","type":"EndNode"}],"edges":[{"source":"0","target":"1"},{"source":"1","target":"2"}]}'
```

## Project structure

```text
Harness/
├── backend/
│   ├── app.py                  # FastAPI routes + uvicorn entry
│   ├── apirun.py               # Groq client (llama-3.3-70b-versatile)
│   ├── run_ui.py               # linear graph executor (used by /run)
│   ├── execute_transversal.py  # edge debug helper
│   ├── requirements.txt        # fastapi, uvicorn, python-dotenv, groq
│   └── Execution_nodes/        # WIP: Edge_graph.py, node_map.py, engine.py
├── my-app/                     # Next.js frontend (npm run dev)
│   └── app/
│       ├── page.tsx            # nodes/edges state + sync effects
│       ├── AppShell.tsx        # nodebar toggle + contexts
│       ├── _context/WorkflowContext.tsx  # input/output + POST /run
│       ├── "(ui)"/              # _uiReactFlow, _uiComponent, _navbar
│       └── "(nodes)"/           # _StartNode, _ApiNode, _EndNodes
└── learning/state.md           # mentor memory (not app code)
```

## Configuration

- Backend port/host: `backend/app.py:61-62` (`127.0.0.1:8000`).
- Frontend API URLs are hardcoded to `http://localhost:8000` in `my-app/app/page.tsx:22,47` and `my-app/app/_context/WorkflowContext.tsx:26`. Change all three if you move the backend.
- CORS: only `http://localhost:3000` is allowed (`backend/app.py:17-23`).
- LLM model/params: `backend/apirun.py:18-28` (`temperature=0.7`, `max_completion_tokens=1024`).

## Known limitations

- `Execution_nodes/engine.py:13-14` calls `node_map_create()` / `Edge_graph()` with no args at import time, so importing `tokens` in `app.py` crashes. `/run` currently only works via `run_ui.runui()`; the `Edge_graph` / `node_map_create` / `tokens` calls after it in `app.py:51-53` are dead/broken code.
- `node_map.py:6` stores the whole `nodes` list per id instead of the single node.
- `run_ui.py:8-9` assumes node ids are `0,1,2…` list indexes (`nodes[int(current_id)]`) — breaks with custom/UUID ids or branching.
- `runui()` only handles a single linear chain; no branching, loops, error handling, or streaming.
- No auth, no persistence, no tests.

## Roadmap ideas

- Fix `engine.py` into a real traversal (`edge_graph + node_map → walk → dispatch per node type`).
- Validate graph (exactly one Start, at least one End, all nodes reachable) and return useful 4xx errors.
- Make `ApiNode` endpoint/prompt configurable from the UI instead of hardcoded Groq call.
- Env-based API base URL on the frontend + loading/error states.
