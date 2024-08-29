## Utilizando o react-query
- Na estrutura do nosso projeto hoje, temos 3 diretórios importantes relacionados a lib:

- service: Onde colocamos as nossas funções que consomem o cliente HTTP para se comunicar com o backend

- queries: Onde armazenamos os hooks que fazem requisições GET utilizando o useQuery da lib do <b>react-query</b>. Nela iremos criar hooks customizados do react que fazem a comunicação com a lib. Fazendo com que mantenhamos a padronização de uso da lib no projeto, além de garantirmos também a existência de uma só [queryKey](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys) para aquela finalidade, além de encapsular a lib da aplicação, fazendo com que mudanças futuras e migrações sejam menos custosas.

```
import { useQuery } from '@tanstack/react-query';

import { getPeopleById } from '@/services/people';

export const usePeople = (peopleId) => {
  return useQuery({
    queryKey: ['people', peopleId],
    queryFn: async ({ queryKey }) => getPeopleById(queryKey[1]),
    retry: false,
    refetchOnWindowFocus: false,
    select: (response) => response,
  });
};


// no componente react

const { data: people, isError, isSuccess } = usePeople(1);

  return (
    <>
        {isSuccess && <p>May the force be with you, {people?.name} </p>}
        {isError && <p>The request failed, check the id and try again</p>}
      </div>
    </>

```

- mutations: Onde concentramos as requests que fazem alguma alteração no servidor, utilizando métodos HTTPs como POST, PUT, DELETE etc... Seguimos a mesma abordagem de criar hooks do react para encapsular a chamada do react-query. Diferentemente do useQuery, o useMutation exporta uma função onde podemos passar os parâmetros de payload para a requisição:

```
import { useMutation } from '@tanstack/react-query';
import { parsePayload } from '../helpers'
import { postToBackend } from '../services/foo'

export const usePostMutation = (type) => {
  return useMutation({
    mutationFn: (formData) => {
      const parsedData = parsePayload(formData);
      return postToBackend(parsedData, type);
    },
  });
};

// Utilização na componente react

  const [postData, setPostData] = useState({})
  const { mutateAsync: mutatePost, isPending: isMutatePostPending } = usePostMutation(type);
  
  const onClickHandler = () => {
      mutatePost(postData)
  }
```

Para mais informações relacionadas ao react query, como suas props e funcionalidades, consulte a documentação oficial:

https://tanstack.com/query/latest