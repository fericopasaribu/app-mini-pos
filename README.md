# Mini POS (Point of Sale) App

A web application for managing mini POS built using NextJS.

## Tech Stack

- **Programming Language**:
  NextJS (v15.4.1)  
- **UI Libraries**:
  -  Tailwind CSS (v4.1)
  -  Shadcn (v2.9.0)  
- **ORM**: Prisma (v6.13.0) 
- **Database**: PostgreSQL (v16.9)

---

## Setup Instructions

### 1. Open Terminal / Console

Start by opening your terminal or command prompt.

### 2. Clone the Repository

   ```bash
   git clone https://github.com/fericopasaribu/mini-pos.git
   cd mini-pos
   ```
### 3. Project Setup

- Open your terminal and navigate to the folder where the cloned project is located.
  
- Run the following command to install dependencies
    ```bash
    npm i
    ```
- Rename ``` .env.example ``` file to ``` .env ``` 
    
- Open the ``` .env ``` file and update the ``` DATABASE_URL ``` configuration to match your PostgreSQL username, password, and database name.
    ```bash
    DATABASE_URL="postgresql://username:password@localhost:5432/db_pos?schema=public"
    ```
    
- Open the ``` package.json ``` and update the ``` "migrate" ``` configuration to match your PostgreSQL username, password, and database name.
    ```bash
    "migrate": "npx prisma migrate dev && psql \"postgresql://username:password@localhost:5432/db_pos\" -f prisma/sql/create_views.sql"
    ```
    
- Run the following command to apply the database migrations
    ```bash
    npx run migrate
    ```
    
- Run the following command in the terminal
    ```bash
    npm run dev
    ```
