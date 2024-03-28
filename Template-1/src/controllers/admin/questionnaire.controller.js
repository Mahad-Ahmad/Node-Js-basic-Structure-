const Questionnaire = require("../../models/questionnaire.model");
const templateModel = require("../../models/template.model");
const Template = require("../../models/template.model");

/**
 * List of Questionnaires
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {JSON}
 */
exports.list = async (req, res, next) => {
  let { page, limit } = req.query;
    limit = limit ??15;
    page = page ?? 1;
  try {
    const quistionnaires = await Questionnaire.find({}).populate("templateId")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: "descending" });
    const total = await Questionnaire.find({});
    res.status(200).send({
      message: "request successful",
      data: quistionnaires,
      pagination: {
        page,
        limit,
        total: total.length,
        pages:
          Math.ceil(total.length / limit) <= 0
            ? 1
            : Math.ceil(total.length / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create Questionnaires
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {JSON}
 */
exports.create = async (req, res, next) => {
  try {
    const { templates, name } = req.body;
    const CreatedTemplate = await Template.insertMany(templates);
    const quistionnaire = await new Questionnaire({ name: name });
    quistionnaire.templateId = CreatedTemplate.map((item) => item._id);
    quistionnaire.save();
    res.status(200).send({
      message: "request successful",
      quistionnaire,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * updates a Questionnaire with template
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {JSON}
 */
exports.update = async (req, res, next) => {
  try {
    var { id, update } = req.body;
    const updated = await Questionnaire.findByIdAndUpdate(id, {
      name: update.name,
    });
    if (!updated) {
      throw new Error("update unseccessfull");
    }
    updated?.templateId?.forEach(async (id, idx) => {
      try {
        await templateModel.findByIdAndUpdate(id, update.templates[idx]);
      } catch (error) {
        next(error);
      }
    });
    res.status(200).send({
      message: "updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a Questionnaire with template
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {JSON}
 */
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Questionnaire.findById(id);
    deleted.templateId.map((item) =>
      Template.findByIdAndRemove(item.toString()).exec()
    );
    deleted.remove();

    res.status(200).send({
      message: "deleted successfully",
      deleted,
    });
  } catch (error) {
    next(error);
  }
};