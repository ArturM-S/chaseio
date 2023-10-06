import { ErrorHandler } from '../error/ErrorHandler.js';

export class SearchController {
  constructor(searchService) {
    this.searchService = searchService;
  }

  async fetchAll(req, res) {
    try {
      const result = await this.searchService.findAll();

      res.status(200).json({
        result
      });
    } catch (error) {
      const errorHandler = ErrorHandler.internalServerError('Erro ao buscar resultados');
      res.status(errorHandler.statusCode).json({ error: errorHandler.message });
    }
  }

  async fetchDataByCnae(req, res) {
    try {
      const { cnae } = req.body;

      const resultsCnaeFiscal = await this.searchService.searchByCnaeFiscal(cnae);

      res.status(200).json({
        resultsCnaeFiscal,
      });
    } catch (error) {
      const errorHandler = ErrorHandler.internalServerError('Erro ao buscar resultados por CNAE Fiscal');
      res.status(errorHandler.statusCode).json({ error: errorHandler.message });
    }
  }

async findByStateCityCnae(req, res) {
    try {
      const { state, city, cnae } = req.body;

      const results = await this.searchService.findByStateCityCnae(state, city, cnae);

      res.status(200).json({
        results,
      });
    } catch (error) {
      const errorHandler = ErrorHandler.internalServerError('Erro ao buscar resultados por UF, Município e CNAE');
      res.status(errorHandler.statusCode).json({ error: errorHandler.message });
    }
  }
}
