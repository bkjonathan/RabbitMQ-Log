function good(){
  console.log('god')
  const interFun = ()=>{
    console.log('I am internal function')
  }

  interFun()
}

good()