const { Wechaty, Room } = require('wechaty')

Wechaty.instance()
	.on('scan', (url, code) => {
		if (!/201|200/.test(String(code))) {
			const loginUrl = url.replace(/\/qrcode\//, '/l/')
			require('qrcode-terminal').generate(loginUrl)
		}
		console.log(url)
	})

	.on('login', user => {
		console.log(`${user} login`)
	})

	.on('friend', async function (contact, request) {
		if (request) {
			await request.accept()
			console.log(`Contact: ${contact.name()} send request ${request.hello}`)
		}
	})

	.on('message', async function (m) {
		const contact = m.from()
		const content = m.content()
		const room = m.room()

		if (room) {
			console.log(`Room: ${room.topic()} Contact: ${contact.name()} Content: ${content}`)
		} else {
			console.log(`Contact: ${contact.name()} Content: ${content}`)
			m.say(`你好${contact.name()}，我目前暂时不在，稍后联系你`)
		}

		if (m.self()) {
			return
		}
		if (/开始刷新/.test(content)) {
			m.say('tomorrow will be better!')
			console.log('tomorrow will be better!')
		}
		if (/tomorrow will be better!/.test(content)) {
			m.say('开始刷新')
			console.log('开始刷新')
		}

		// if (/我要加群/.test(content)) {
		// 	let keyroom = await Room.find({ topic: "自家人" })
		// 	if (keyroom) {
		// 		await keyroom.add(contact)
		// 		await keyroom.say("你好!已经把你拉进群了", contact)
		// 	}
		// }

		// if (/我要离开/.test(content)) {
		// 	let keyroom = await Room.find({ topic: "自家人" })
		// 	if (keyroom) {
		// 		await keyroom.say("你将被移除群聊", contact)
		// 		await keyroom.del(contact)
		// 	}
		// }
	})

	.init()