export default class{

    roundedToFixed(_float, _digits) {
        const rounder = Math.pow(10, _digits)
        return parseFloat((Math.round(_float * rounder) / rounder).toFixed(_digits))
      }
    
}