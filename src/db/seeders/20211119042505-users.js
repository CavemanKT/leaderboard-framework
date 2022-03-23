const bcrypt = require('bcrypt')
const { faker } = require('@faker-js/faker');
const {User, Profile, Report1, Report2PreRevenue, Report3PostRevenue} = require('../models')

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
                email: `${i}@test.com`,
                passwordHash,
                registrationType: 'email',
                role: 'user'
            })
        }

        await User.create({
            email: `admin@test.com`,
            passwordHash,
            registrationType: 'email',
            role: 'admin'
        })

        for (let i = 1; i <= 10; i++) {
            await Profile.create({
                domain: `https://www.${i}@test.com`,
                founded: 1200 + i,
                country: faker.address.country(),
                category: faker.name.jobType(),
                score: 12 + i,
                UserId: i
            })
        }

        for(var j = 1; j <= 10; j++){
            for( let i = 1; i <= 10; i++) {
                await Report1.create({
                    pickedStage1: 'postRevenue',
                    weeklyAchievement: '12',
                    weeklyPlan: '12',
                    score:12 +i ,
                    ProfileId: j
                })
            }
        }
        
    }
}