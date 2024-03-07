import { clientService } from '../services/index.js';

const createClient = async (req, res, next) => {
  await clientService.createClient(req, res, next);
};

const getClientById = async (req, res, next) => {
  await clientService.getClientById(req, res, next);
};

const updateClient = async (req, res, next) => {
  await clientService.updateClient(req, res, next);
};

const deleteClient = async (req, res, next) => {
  await clientService.deleteClient(req, res, next);
};

const findAllClients = async (req, res, next) => {
  await clientService.findAllClients(req, res, next);
};

export { createClient, getClientById, updateClient, deleteClient, findAllClients };
