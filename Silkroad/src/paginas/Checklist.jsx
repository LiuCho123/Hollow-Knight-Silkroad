import React from "react";
import { Link } from "react-router-dom"
const logoUrl = '/img/Logo Silk Road.png';
const knightUrl = "/img/The_Knight.png";
const percentageValues = {
    'boss': 1,
    'equip': 2,
    'spell': 1,
    'colosseum': 1,
    'mask-shard': 0.25,
    'nail-upgrade': 1,
    'dream-nail': 1,
    'nail-art': 1,
    'vessel-fragment': 1/3,
    'dreamer': 2,
    'godhome': 1,
    'charm': 1
};
const checklistData = [
    { 
        category: 'boss', title: 'Jefes', items: [
            {id: 'boss1', label: 'Falso Caballero' },
            {id: 'boss2', label: 'Madre Gruz' },
            {id: 'boss3', label: 'Maestro del alma' },
            {id: 'boss4', label: 'Malwek Incubador' },
            {id: 'boss5', label: 'Señores Mantis' },
            {id: 'boss6', label: 'Hornet (Protectora)' },
            {id: 'boss7', label: 'Nosk' },
            {id: 'boss8', label: 'Caballero de la Colmena' },
            {id: 'boss9', label: 'Defensor del Estiercol' },
            {id: 'boss10', label: 'Hornet (Centinela)' },
            {id: 'boss11', label: 'Señor Traidor' },
            {id: 'boss12', label: 'Grim' },
            {id: 'boss13', label: 'Coleccionista' },
            {id: 'boss14', label: 'Uumuu' },
            {id: 'boss15', label: 'Caballeros Vigilantes' },
            {id: 'boss16', label: 'Galien' },
            {id: 'boss17', label: 'Marmu' },
            {id: 'boss18', label: 'Markoth' },
            {id: 'boss19', label: 'Xero' },
            {id: 'boss20', label: 'Sin Ojos' },
            {id: 'boss21', label: 'Viejo Hu' },
            {id: 'boss22', label: 'Gorb' },
            {id: 'boss23', label: 'Rey Pesadilla Grimm' }]},
    { 
        category: 'equip', title: 'Equipamiento', items: [
            {id: 'equip1', label: 'Capa de Polilla' },
            {id: 'equip2', label: 'Garra de Mantis' },
            {id: 'equip3', label: 'Corazon de Cristal' },
            {id: 'equip4', label: 'Lagrima de Isma' },
            {id: 'equip5', label: 'Marca del Rey' },
            {id: 'equip6', label: 'Alas del Monarca' },
            {id: 'equip7', label: 'Manto de la Oscuridad' }]},
    { 
        category: 'spell', title: 'Hechizos', items: [
            {id: 'spell1', label: 'Espiritu Vengativo' },
            {id: 'spell2', label: 'Alma Sombria' },
            {id: 'spell3', label: 'Oscuridad descendente' },
            {id: 'spell4', label: 'Espectros Aulladores' },
            {id: 'spell5', label: 'Chillido del Abismo' }]},
    { 
        category: 'colosseum', title: 'Coliseo', items: [
            {id: 'colosseum1', label: 'Prueba del Guerrero' },
            {id: 'colosseum2', label: 'Prueba del Conquistador' },
            {id: 'colosseum3', label: 'Prueba del Insensato' }]},
    { 
        category: 'mask-shard', title: 'Fragmentos de Mascara', items: [
            {id: 'mask-shard1', label: 'Fragmento 1' },
            {id: 'mask-shard2', label: 'Fragmento 2' },
            {id: 'mask-shard3', label: 'Fragmento 3' },
            {id: 'mask-shard4', label: 'Fragmento 4' },
            {id: 'mask-shard5', label: 'Fragmento 5' },
            {id: 'mask-shard6', label: 'Fragmento 6' },
            {id: 'mask-shard7', label: 'Fragmento 7' },
            {id: 'mask-shard8', label: 'Fragmento 8' },
            {id: 'mask-shard9', label: 'Fragmento 9' },
            {id: 'mask-shard10', label: 'Fragmento 10' },
            {id: 'mask-shard11', label: 'Fragmento 11' },
            {id: 'mask-shard12', label: 'Fragmento 12' },
            {id: 'mask-shard13', label: 'Fragmento 13' },
            {id: 'mask-shard14', label: 'Fragmento 14' },
            {id: 'mask-shard15', label: 'Fragmento 15' },
            {id: 'mask-shard16', label: 'Fragmento 16' }]},
    { 
        category: 'nail-upgrade', title: 'Mejoras de Clavo', items: [
            {id: 'nail-upgrade1', label: 'Aguijon Afilado' },
            {id: 'nail-upgrade2', label: 'Aguijon Esterilizado' },
            {id: 'nail-upgrade3', label: 'Aguijon en Espiral' },
            {id: 'nail-upgrade4', label: 'Aguijon Puro' }]},
    { 
        category: 'dream-nail', title: 'Nail de Sueño', items: [
            {id: 'dream-nail1', label: 'Consigue el Aguijon Onirico' },
            {id: 'dream-nail2', label: 'Despierta el Aguijon Onirico' },
            {id: 'dream-nail3', label: 'Ultimas palabras del Seer' }]},
        ];

//function Checklist() {}