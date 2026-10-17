#  DevOps Production Lab — Podman & Node.js Stack

Laboratório prático focado em arquitetura de infraestrutura, containerização e gerenciamento de microsserviços. O projeto consiste em uma aplicação Node.js (Express) integrada a um banco de dados relacional PostgreSQL, orquestrados via **Podman Compose** em ambiente Linux.

---

##  Stack Tecnológica

* **Runtime:** Node.js (v18 Alpine)
* **Framework:** Express.js
* **Database:** PostgreSQL 15
* **Container Engine:** Podman & Podman Compose
* **Ambiente:** Ubuntu Server (Hyper-V com IP Estático)

---

## 📐 Arquitetura da Solução

```text
[ Cliente / Browser ]
          │
          ▼ (Porta 3000)
┌─────────────────────────────────────────┐
│ Container: web_app (Node.js Express)    │
└────────────────────┬────────────────────┘
                     │ (Rede Interna)
                     ▼ (Porta 5432)
┌─────────────────────────────────────────┐
│ Container: postgres_db (PostgreSQL 15)  │
│ Volume: postgres_data                   │
└─────────────────────────────────────────┘
