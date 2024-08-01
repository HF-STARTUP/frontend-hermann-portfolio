import planing from "@/assets/img/design/product/planing_1.png";
import encaissement from "@/assets/img/design/product/encaissement_2.png";
import suivie from "@/assets/img/design/product/suivie_3.png";
import fournisseur from "@/assets/img/design/product/fournisseurs_4.png";
import geolocalisation from "@/assets/img/design/product/geolocalisation_5.png";
import app from "@/assets/img/design/product/app_6.png";
import {ProductType} from "@/types/generic";


export const ALL_PRODUCTS = [
    {
        cover: planing,
        title: 'Planning automatique',
        color: 'blue-700',
        description: 'La fonction de planification n’a jamais été chose facile. Mais avec VTCC, vous avez   désormais   la   possibilité   d’optimiser   le   processus   en   attribuant les chauffeurs aux véhicules de façon automatique en fonction des disponibilités, des compétences et des exigences   spécifiques. Cela   contribue   à   maximiser l\'efficacité opérationnelle de votre flotte, réduisant ainsi les temps d\'inactivité et améliorant la productivité.'
    },
    {
        cover: encaissement,
        title: 'Suivi des encaissements',
        color: 'yellow-500',
        description: 'Grâce à notre outil de suivi des recettes intégré, VTCC permet de suivre lesrecettes générées par chaque véhicule. Cette fonctionnalité facilite également leprocessus d\'encaissement et aide dans la génération de rapports financiers pourune comptabilité précise'
    },
    {
        cover: suivie,
        title: 'Suivi de panne et entretien de véhicule',
        color: 'red-500',
        description: 'Cette fonctionnalité vous donne la possibilité de suivre en temps réel de l\'état de chaque véhicule de votre flotte. Elle vous permet de gérer les entretiens réguliers des véhicules, de suivre les pannes éventuelles et de planifier les réparations nécessaires. Vous avez également des rappels automatiques pour les opérations d’entretien planifiées, des alertes pour une maintenance préventive et un suivi détaillé de l\'historique des réparations'
    },
    {
        cover: fournisseur,
        title: 'Gestion des fournisseurs',
        color: 'green-600',
        description: 'En enregistrant les informations de contact, les contrats et les paiements, VTCC facilite   la   gestion   des   relations   avec   les   fournisseurs,   que   ce   soit   pour l\'approvisionnement en carburant, les pièces de rechange ou d\'autres services liés   à   la   flotte.   Elle   permet   de   suivre   les   performances   des   fournisseurs, d\'optimiser les coûts et de simplifier les processus de commande.'
    },
    {
        cover: geolocalisation,
        title: 'Geolocalisation',
        color: 'zinc-500',
        description: 'La fonction de planification n’a jamais été chose facile. Mais avec VTCC, vous avez   désormais   la   possibilité   d’optimiser   le   processus   en   attribuant automatiquement les chauffeurs aux véhicules en fonction des disponibilités, des compétences   et   des   exigences   spécifiques.   Cela   contribue   à   maximiser l\'efficacité opérationnelle de votre flotte, réduisant ainsi les temps d\'inactivité et améliorant la productivité.'
    },
    {
        cover: app,
        title: 'Application, mobile',
        color: 'red-700',
        description: 'Les chauffeurs peuvent par exemple accéder à des rapports détaillés sur leuractivité, y compris le nombre de missions effectuées, les revenus générés, lesheures   de   conduite,   etc.   Ces   rapports   facilitent   la   gestion   financière   et   lacomptabilité personnelle. Tandis qu’un gestionnaire de flotte aura à lui toutes lesfonctionnalités de gestion administrative'
    },
] satisfies ProductType[]
