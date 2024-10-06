// bibliotecas para gerenciar requisições HTTP
import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app =  express()
app.use(express.json())


app.get('/lendas', async (request, response) => {
  let lendas = []

  if(request.query) {
    lendas = await prisma.lenda.findMany({
      where: {
        nome: request.query.nome,
        descricao: request.query.descricao,
        data_primeira_aparicao: request.query.data_primeira_aparicao,
        origem_pais: request.query.origem_pais,
        origem_estado: request.query.origem_estado,
        origem_cidade: request.query.origem_cidade,
        localizacao_tipo: request.query.localizacao_tipo,
        localizacao_descricao: request.query.localizacao_descricao
      }
    })

  } else {
    const lendas = await prisma.lenda.findMany()
  }
  response.status(200).json(lendas)
})


app.post('/lendas', async (request, response) => {

  await prisma.lenda.create({
    data: {
      nome: request.body.nome,
      descricao: request.body.descricao,
      data_primeira_aparicao: request.body.data_primeira_aparicao,
      origem_pais: request.body.origem_pais,
      origem_estado: request.body.origem_estado,
      origem_cidade: request.body.origem_cidade,
      localizacao_tipo: request.body.localizacao_tipo,
      localizacao_descricao: request.body.localizacao_descricao
    }
  })

  response.status(201).json(request.body)
})

app.put('/lendas/:id', async (request, response) => {

  await prisma.lenda.update({
    where: {
      id: request.params.id
    },
   data: {
      nome: request.body.nome,
      descricao: request.body.descricao,
      data_primeira_aparicao: request.body.data_primeira_aparicao,
      origem_pais: request.body.origem_pais,
      origem_estado: request.body.origem_estado,
      origem_cidade: request.body.origem_cidade,
      localizacao_tipo: request.body.localizacao_tipo,
      localizacao_descricao: request.body.localizacao_descricao
    }
  })

 response.status(201).json(request.body)
})

app.delete('/lendas/:id', async (request, response) => {

  await prisma.lenda.delete({
    where: {
      id: request.params.id
    },
  })
  
  response.status(200).json({ message: 'Lenda deletado com sucesso'})
})





// porta onde o servidor irá rodar
app.listen(7000)

// user mongodb: isadora senha mongodb: isadora456