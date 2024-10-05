import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct,setNewProduct] = useState({
    name:"",
    price:"",
    image:""
  })

const toast = useToast();
const {createProduct} = useProductStore();

const handleAddProduct = async () => {
  const {success,message} = await createProduct(newProduct);
  if(!success){
    toast({
      title:"Error",
      description:message,
      status:"error",
      duration: 3000,
      isClosable:true
    })
  }
  else{
    toast({
      title:"Success",
      description:message,
      status:"success",
      duration: 3000,
      isClosable:true
    })
  }
  if(success)
    setNewProduct({name:"",price:"",image:""});
}

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>Create New Product</Heading>
      <Box bg={useColorModeValue("white","gray.800")}
          w={"full"}
          p={6}
          rounded={'lg'} shadow={"md"}
      >
        <VStack spacing={4}>
          <Input type="text" placeholder='Product Name'
            name='name'
            value={newProduct.name}
            onChange={(e) =>{
                setNewProduct({...newProduct,name:e.target.value})
            }}  
          />
          <Input type="number" placeholder='Price'
            name='price'
            value={newProduct.price}
            onChange={(e) =>{
                setNewProduct({...newProduct,price:e.target.value})
            }}  
          />
          <Input type="text" placeholder='image url'
            name='image'
            value={newProduct.image}
            onChange={(e) =>{
                setNewProduct({...newProduct,image:e.target.value})
            }}  
          />
          <Button colorScheme='blue' onClick={handleAddProduct} w='full'>Add Product</Button>
        </VStack>
      </Box>

      </VStack>
    </Container>
  )
}

export default CreatePage