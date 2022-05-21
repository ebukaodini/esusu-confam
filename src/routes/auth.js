const express = require('express');
const router = express.Router();
const members = require('../models/members.model');
const groups = require('../models/groups.model');
const { badRequest, serverError, success } = require('../utils/reponse-helpers');
const passwordHash = require('password-hash');
const groupMember = require('../models/group-member.model');

// /auth
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  members.findOne({
    email
  })
    .then(value => {
      const verified = passwordHash.verify(password, value.password)
      if (verified) {
        const jwt = require('jsonwebtoken')
        const token = jwt.sign({ user: value }, process.env.TOKEN_SECRET, { expiresIn: '3600s' });

        success(res, 'Login successful', {
          authToken: token,
          user: value
        })
      } else
        badRequest(res, 'Invalid email/password')
    }).catch(error => {
      badRequest(res, 'Invalid email/password')
    })
})

const createMember = async (user) => {
  return members.create({
    ...user
  })
}

router.post('/register', (req, res) => {
  try {
    const { firstname, lastname, telephone, email, password, group } = req.body;
    const hash = passwordHash.generate(password)

    members.find({ email: email })
      .then(value => {
        if (value.length > 0) return badRequest(res, 'User already exists')
        let groupCapacity = 0;

        if (group && group !== "") {
          groups.findById(group)
            .then(value => {
              groupCapacity = value.capacity
              if (value.capacity === value.maxCapacity)
                return badRequest(res, 'Group is filled already. Try another group.')
              else
                return createMember({
                  firstname, lastname, email, telephone,
                  password: hash
                }).then(async value => {

                  await groupMember.create({
                    groupId: group,
                    memberId: value._id
                  })

                  await groups.updateOne({ _id: group }, {
                    capacity: (groupCapacity + 1)
                  })

                  return success(res, 'User created', value)
                }).catch(error => {
                  return badRequest(res, error.message)
                })
            })
            .catch(error => {
              return badRequest(res, 'Invalid group. Confirm Group ID.')
            })
        } else {
          return createMember({
            firstname, lastname, email, telephone,
            password: hash
          }).then(value => {
            success(res, 'User created', value)
          })
        }

      })

  } catch (err) {
    console.log(err)
  }
})

module.exports = router;