import persianJs from 'persianjs';

function persianNumber(str: any = ''): string {
  return persianJs(str.toString()).englishNumber().toString();
}

export {persianNumber};
