/* eslint-disable space-before-blocks */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
const bcrypt = require('bcrypt')
const { faker } = require('@faker-js/faker');
const {User, Profile, Report1, Report2PreRevenue, Report3PostRevenue} = require('../models')


// generate a time stamp for createdAt
const genRandDay = () => {
  const randDay = Math.floor(Math.random() * 27) + 1
  return randDay
}

const genRandMonth = () => {
  const randMonth = Math.floor(Math.random() * 12) + 1
  if (randMonth > 12) {
    return genRandMonth()
  }
  return randMonth
}

const genRandYear = () => {
  const randYear = 2010
  return randYear
}

const genRandDate = () => {
  const randDay = genRandDay()
  const randMonth = genRandMonth()
  const randYear = genRandYear()

  const randDate = `${randYear}-${randMonth}-${randDay} 13:29:29.516+08`
  return randDate
}

module.exports = {
    up: async () =>{
        await User.destroy({ truncate: true })
        await Profile.destroy({ truncate: true })
        await Report1.destroy({ truncate: true })
        await Report2PreRevenue.destroy({ truncate: true })
        await Report3PostRevenue.destroy({ truncate: true })

        const passwordHash = await bcrypt.hash('123123', 10)

        for (let i = 1; i <= 10; i++) {
            await User.create({
                id: i,
                email: `${i}@test.com`,
                passwordHash,
                registrationType: 'email',
                role: 'user',
            })
        }
        
        await User.create({
            id: 11,
            email: `11@test.com`,
            passwordHash,
            registrationType: 'email',
            role: 'user',
            verified: true
        })

        await User.create({
            id: 12,
            email: `admin@test.com`,
            passwordHash,
            registrationType: 'email',
            role: 'admin',
            verified: true
        })

        for (let i = 1; i <= 10; i++) {
            await Profile.create({
                id: i,
                domain: `https://www.${i}@test.com`,
                founded: 1200 + i,
                country: faker.address.country(),
                category: faker.name.jobType(),
                score: 12 + i,
                UserId: i
            })
        }

            await Profile.create({
                id: 11,
                domain: `https://www.11@test.com`,
                founded: 1200,
                country: faker.address.country(),
                category: faker.name.jobType(),
                score: 12,
                UserId: 11,
                verified: true
            })

        for (let j = 1; j <= 11; j++){
            for ( let i = 1; i <= 10; i++) {
                await Report1.create({
                    pickedStage1: 'postRevenue',
                    weeklyAchievement: '12',
                    weeklyPlan: '12',
                    score: 12 + i ,
                    ProfileId: j,
                    updatedAt: genRandDate()
                })
            }
        }
        
    }
}