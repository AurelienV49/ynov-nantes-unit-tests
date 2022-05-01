const express = require('express');
const bodyParser = require('body-parser');
const { getTodo, postTodo, patchTodo } = require('./toDoController');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Récupère la liste des todo
 *     description: Todo en get.
 *     responses:
 *       200:
 *         description: Liste des todo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: La todo à faire.
 *                         example: La documentation c'est cool !
 */
app.get('/todo', getTodo);

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Créer une todo.
 *     parameters:
 *       - in: path
 *         name: Qui ?
 *         required: true
 *         description: l'ID de la todo à créer.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: Quoi faire ?
 *         required: true
 *         description: La désignation de la tâche à faire.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Une todo à faire.
 *                       example: Faire la vaisselle
 *       400:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: On à besoin de détails sur la todo à faire !!!
 *                       example: Genre faire la vaisselle
 */
app.post('/todo', postTodo);

/**
 * @swagger
 * /todo/{id}:
 *   patch:
 *     summary: Modifier une todo.
 *     parameters:
 *       - in: path
 *         name: Qui doit être modifié ?
 *         required: true
 *         description: l'ID de la todo à modifier.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: Quoi faire ?
 *         required: true
 *         description: La désignation de la nouvelle tâche à faire pour le même id.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nouvelle todo à faire.
 *                       example: Faire son mémoire
 *       400:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: On à besoin de détails sur la nouvelle todo à faire !!!
 *                       example: Se lever tôt le matin !
 */
app.patch('/todo/:id', patchTodo);

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        description: "Module 'Méthodologie de tests - tests unitaire'",
        title: 'Workshop documentation Antonin JOULY et Aurélien VAILLANT',
        version: '1.0.2',
        description: 'TP du vendredi 29 avril 2022',
        license: {
            name: 'Ynov Nantes',
            url: 'https://www.ynov-nantes.com/',
        },
        contact: {
            name: 'scolarite-nantes@ynov.com',
            url: 'scolarite-nantes@ynov.com',
        },
    },
    tags: {
        name: "Todo",
        description: "Gestion de la liste des tâches à faire",
    },
    schemes: {
        https: "https",
        http: "http"
    },
    servers: [{
        url: 'http://localhost:5000',
        description: 'Pour les tests',
    }, ],
};

const options = {
    swaggerDefinition,
    apis: ['./router.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

module.exports = app;