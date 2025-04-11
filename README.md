
# **EcoVault**

O **EcoVault** é um aplicativo digital que incentiva a redução do desperdício de alimentos, produtos e recursos, promovendo um estilo de vida mais sustentável. Ele ajuda os usuários a monitorar produtos em suas dispensas, evitar o desperdício, descartar itens de forma sustentável e acompanhar seu impacto ambiental.

---

## **Funcionalidades Principais**        
1. **Cadastro de Produtos:**
   - Leitura de etiquetas (código de barras) ou inserção manual de produtos.
   - Registro de data de validade e categoria (alimento, limpeza, outros).

2. **Dispensa Virtual:**
   - Organização dos produtos por categorias (geladeira, despensa, freezer).
   - Monitoramento de datas de validade.

3. **Notificações Push:**
   - Alertas sobre produtos próximos do vencimento.
   - Sugestões de receitas e dicas de armazenamento.

4. **Descarte Sustentável:**
   - Guias para compostagem, reciclagem e doação de produtos.
   - Registro de descartes feitos pelo usuário.

5. **Relatórios e Estatísticas:**
   - Acompanhamento de desperdício evitado.
   - Métricas de impacto ambiental (ex.: kg de CO2 economizados).

---

## **Fluxograma do Fluxo de Uso**

```plaintext
+-------------------+
|  Início do App    |
+-------------------+
          |
          v
+-------------------+
| Cadastro de Produto|
+-------------------+
          |
          v
+-------------------+       +-------------------+
| Escanear Código   |       | Inserir Manualmente|
| de Barras/Etiqueta|       | (Nome, Validade)  |
+-------------------+       +-------------------+
          |                           |
          +------------+--------------+
                       |
                       v
+-------------------+
| Adicionar à       |
| Dispensa Virtual  |
+-------------------+
          |
          v
+-------------------+
| Monitorar Validade|
| (Notificações Push)|
+-------------------+
          |
          v
+-------------------+       +-------------------+
| Produto Próximo   |       | Produto Vencido   |
| do Vencimento?    |       | ou Descartado?    |
+-------------------+       +-------------------+
          |                           |
          v                           v
+-------------------+       +-------------------+
| Sugerir Receitas  |       | Guia de Descarte  |
| ou Armazenamento  |       | Sustentável       |
+-------------------+       +-------------------+
          |                           |
          v                           v
+-------------------+       +-------------------+
| Marcar como Usado |       | Marcar como        |
| (Remover da       |       | Descartado         |
| Dispensa Virtual) |       | (Remover da        |
+-------------------+       | Dispensa Virtual)  |
          |                 +-------------------+
          v                           |
+-------------------+                 v
| Relatórios e      |       +-------------------+
| Estatísticas      |<------+ Histórico de Uso  |
| (Desperdício      |       | e Descarte        |
| Evitado, Impacto) |       +-------------------+
+-------------------+
          |
          v
+-------------------+
| Fim do Processo   |
+-------------------+
```

---

## **Schema MySQL**

O banco de dados do EcoVault foi projetado para ser simples, escalável e fácil de manter. Abaixo está o schema MySQL com comentários explicativos.

### **Tabelas e Estrutura**

```sql
-- Tabela de Usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do usuário',
    nome VARCHAR(100) NOT NULL COMMENT 'Nome do usuário',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT 'E-mail do usuário (único para cada conta)',
    senha VARCHAR(255) NOT NULL COMMENT 'Senha do usuário (criptografada)',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data de cadastro do usuário'
) COMMENT = 'Armazena informações dos usuários do EcoVault';

-- Tabela de Produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do produto',
    nome VARCHAR(100) NOT NULL COMMENT 'Nome do produto',
    codigo_barras VARCHAR(50) UNIQUE COMMENT 'Código de barras do produto (opcional)',
    categoria ENUM('alimento', 'limpeza', 'outros') NOT NULL COMMENT 'Categoria do produto (alimento, limpeza ou outros)',
    data_validade DATE NOT NULL COMMENT 'Data de validade do produto',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data de cadastro do produto'
) COMMENT = 'Armazena informações dos produtos cadastrados no EcoVault';

-- Tabela de Dispensa Virtual
CREATE TABLE dispensa (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do registro na dispensa',
    usuario_id INT NOT NULL COMMENT 'ID do usuário que adicionou o produto',
    produto_id INT NOT NULL COMMENT 'ID do produto adicionado à dispensa',
    quantidade INT DEFAULT 1 COMMENT 'Quantidade do produto na dispensa',
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data em que o produto foi adicionado à dispensa',
    status ENUM('ativo', 'usado', 'descartado') DEFAULT 'ativo' COMMENT 'Status do produto (ativo, usado ou descartado)',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
) COMMENT = 'Relaciona usuários e produtos, representando a dispensa virtual de cada usuário';

-- Tabela de Notificações
CREATE TABLE notificacoes (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único da notificação',
    usuario_id INT NOT NULL COMMENT 'ID do usuário que recebe a notificação',
    produto_id INT NOT NULL COMMENT 'ID do produto relacionado à notificação',
    mensagem TEXT NOT NULL COMMENT 'Mensagem da notificação (ex.: alerta de validade)',
    data_notificacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data em que a notificação foi enviada',
    lida BOOLEAN DEFAULT FALSE COMMENT 'Indica se a notificação foi lida pelo usuário',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
) COMMENT = 'Armazena notificações enviadas aos usuários sobre produtos próximos do vencimento';

-- Tabela de Descarte Sustentável
CREATE TABLE descarte (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do registro de descarte',
    usuario_id INT NOT NULL COMMENT 'ID do usuário que realizou o descarte',
    produto_id INT NOT NULL COMMENT 'ID do produto descartado',
    tipo_descarte ENUM('compostagem', 'reciclagem', 'doacao') NOT NULL COMMENT 'Tipo de descarte (compostagem, reciclagem ou doação)',
    data_descarte TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data em que o descarte foi realizado',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
) COMMENT = 'Registra os descartes sustentáveis feitos pelos usuários';

-- Tabela de Relatórios e Estatísticas
CREATE TABLE relatorios (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do relatório',
    usuario_id INT NOT NULL COMMENT 'ID do usuário relacionado ao relatório',
    produtos_usados INT DEFAULT 0 COMMENT 'Quantidade de produtos usados pelo usuário',
    produtos_descartados INT DEFAULT 0 COMMENT 'Quantidade de produtos descartados pelo usuário',
    desperdicio_evitado DECIMAL(10, 2) DEFAULT 0 COMMENT 'Quantidade de desperdício evitado (em kg ou litros)',
    impacto_ambiental DECIMAL(10, 2) DEFAULT 0 COMMENT 'Impacto ambiental positivo (ex.: kg de CO2 evitados)',
    data_relatorio TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data de geração do relatório',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) COMMENT = 'Armazena métricas sobre o desempenho do usuário em reduzir o desperdício';
```

---

### **Exemplos de Consultas SQL**

1. **Listar produtos na dispensa de um usuário:**
   ```sql
   SELECT p.nome, p.data_validade, d.quantidade, d.status
   FROM dispensa d
   JOIN produtos p ON d.produto_id = p.id
   WHERE d.usuario_id = 1 AND d.status = 'ativo';
   ```

2. **Listar notificações não lidas de um usuário:**
   ```sql
   SELECT n.mensagem, p.nome, p.data_validade
   FROM notificacoes n
   JOIN produtos p ON n.produto_id = p.id
   WHERE n.usuario_id = 1 AND n.lida = FALSE;
   ```

3. **Calcular desperdício evitado por um usuário:**
   ```sql
   SELECT SUM(desperdicio_evitado) AS total_evitado
   FROM relatorios
   WHERE usuario_id = 1;
   ```

4. **Listar descartes sustentáveis de um usuário:**
   ```sql
   SELECT p.nome, d.tipo_descarte, d.data_descarte
   FROM descarte d
   JOIN produtos p ON d.produto_id = p.id
   WHERE d.usuario_id = 1;
   ```

Este README.md cobre todos os aspectos essenciais do **EcoVault**. Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento. 😊
