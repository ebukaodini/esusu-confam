const express = require('express');
const router = express.Router();
const members = require('../models/members.model');
const groups = require('../models/groups.model');
const contributions = require('../models/contributions.model');
const groupMembers = require('../models/group-member.model');
const authenticateToken = require('../utils/authenticateToken');
const { badRequest, success } = require('../utils/reponse-helpers');

// /groups
router.get('', authenticateToken, (req, res) => {
  groups.find({
    isSearchable: true
  })
    .then(value => {
      success(res, 'Available Groups', value.map(group => {
        const { _id: id, name, description, periodicAmount, capacity, maxCapacity } = group
        return { id, name, description, periodicAmount, capacity, maxCapacity }
      }))
    }).catch(error => {
      badRequest(res, error.message)
    })
})



router.get('/:id/members', authenticateToken, async (req, res) => {

  try {
    const groupDetails = await groups.findById(req?.params?.id)
    if (groupDetails.groupAdmin !== req?.user?._id) {
      return badRequest(res, 'Unauthorized access. Only accessible to group admin.')
    }
  } catch (error) {
    return badRequest(res, 'Invalid group. Confirm Group ID.')
  }

  await groupMembers.find({
    groupId: req?.params?.id
  })
    .then(async value => {

      const count = value.length, data = []
      value.forEach(async (val, index) => {
        // get the user details
        let memberData = {}
        await members.findById(val.memberId).then(member => memberData = member._doc)

        // get amount saved
        let amountSaved = 0
        await contributions.find({
          groupId: req?.params?.id,
          memberId: val.memberId
        })
          .then(memberContributions => {
            memberContributions.forEach(contribution => {
              amountSaved += contribution.amount
            })
            return
          })
          .catch(error => {
            return badRequest(res, error.message)
          })

        data.push({ ...memberData, amountSaved })

        if (index === (count - 1))
          return success(res, "Group Members", data)
      })


    }).catch(error => {
      return badRequest(res, 'Invalid group. Confirm Group ID.')
    })

})

router.post('', authenticateToken, async (req, res) => {
  const { name, description, periodicAmount, maxCapacity, isSearchable } = req.body;

  groups.create({
    name, description, periodicAmount, maxCapacity, isSearchable,
    groupAdmin: req?.user?._id
  }).then(async value => {
    await groupMembers.create({
      groupId: value._id,
      memberId: req?.user?._id
    })
    success(res, 'Group created. Invite members to join group with group ID: ' + value._id, value)
  }).catch(error => {
    badRequest(res, error.message)
  })

})

module.exports = router;