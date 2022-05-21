const express = require('express');
const router = express.Router();
const contributions = require('../models/contributions.model');
const authenticateToken = require('../utils/authenticateToken');
const { badRequest, serverError, success } = require('../utils/reponse-helpers');

// /contributions
router.post('/', authenticateToken, async (req, res) => {
  const { group, amount } = req.body

  await contributions.create({
    groupId: group,
    memberId: req?.user?._id,
    amount: amount
  }).then(value => {
    success(res, 'Added contribution successfully')
  }).catch(error => {
    badRequest(res, error.message)
  })
})

module.exports = router;