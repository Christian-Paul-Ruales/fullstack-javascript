(() => {

    // Tipos
    const batman: string = 'Bruce';
    const superman: string = 'Clark';
  
    const existe: boolean = false;
  
    // Tuplas
    const parejaHeroes: [string, string] = [batman,superman];
    const villano: [string, number, boolean] = ['Lex Lutor',5,true];
  
    // Arreglos
    const aliados: string[] = ['Mujer Maravilla','Acuaman','San', 'Flash'];
  
    //Enumeraciones
    enum fuerza {
      Flash = 5,
      Superman = 100,
      Batman = 1,
      Acuaman = 0,
    }

    const fuerzaFlash = fuerza.Flash;
    const fuerzaSuperman = fuerza.Superman;
    const fuerzaBatman = fuerza.Batman;
    const fuerzaAcuaman = fuerza.Acuaman;
  
    // Retorno de funciones
    function activar_batiseñal(): string{
      return 'activada';
    }
  
    function pedir_ayuda(): void{
      console.log('Auxilio!!!');
    }
  
    // Aserciones de Tipo
    const poder: any = '100';
    const largoDelPoder:number = (<string>poder).length;
    console.log( largoDelPoder );
  
  
  })()
  
  