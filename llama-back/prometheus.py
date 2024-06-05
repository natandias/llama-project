from llama_cpp import Llama as LlamaCpp
from langchain.prompts import PromptTemplate
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from dotenv import dotenv_values

global chat_llm

config = dotenv_values(".env")

callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])

chat_llm = LlamaCpp(
    model_path=config["LLM_PROMETHEUS_MODEL_PATH"],
    temperature=0.1,
    n_ctx=8192,
    top_p=0.95,
    callback_manager=callback_manager,
    verbose=True,
    n_gpu_layers=13,
    n_batch=256,
    f16_kv=True,
    model_kwargs={"repetition_penalty": 1.1},
    stop=["###"],
)

query_str = """ <!doctype html>
<html lang="pt-br">
<title>Guia Prático de Segurança Online</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body, h1, h2, h3, h4, h5, h6 {
 font-family: Lato, sans-serif;
}

.w3-bar, button, h1 {
 font-family: Montserrat, sans-serif;
}

.fa-anchor, .fa-coffee {
 font-size: 200px;
}
</style>
<div class="w3-top">
 <div class="w3-large w3-bar w3-card w3-left-align w3-red">
 <button class="w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-large w3-hide-medium w3-large w3-red w3-right" onclick="myFunction()" title="Toggle Navigation Menu">
 <i class="fa fa-bars"></i>
 </button>
 <a href="#" class="w3-button w3-padding-large w3-bar-item w3-white">Home</a>
 <a href="#sobre" class="w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-small">Sobre Nós</a>
 <a href="#contato" class="w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-small">Contato</a>
 <a href="#servicos" class="w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-small">Serviços</a>
 <a href="#recursos" class="w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-small">Recursos</a>
 </div>
 <div class="w3-large w3-hide-large w3-hide-medium w3-bar-block w3-hide w3-white" id="navDemo">
 <a href="#" class="w3-button w3-padding-large w3-bar-item">Home</a>
 <a href="#sobre" class="w3-button w3-padding-large w3-bar-item">Sobre Nós</a>
 <a href="#contato" class="w3-button w3-padding-large w3-bar-item">Contato</a>
 <a href="#servicos" class="w3-button w3-padding-large w3-bar-item">Serviços</a>
 <a href="#recursos" class="w3-button w3-padding-large w3-bar-item">Recursos</a>
 </div>
</div>
<header class="w3-center w3-container w3-red" style="padding:128px 16px">
 <h1 class="w3-margin w3-jumbo">Guia Prático de Segurança Online</h1>
 <p class="w3-xlarge">Ajudando você a proteger sua privacidade na internet</p>
 <button class="w3-button w3-padding-large w3-large w3-black w3-margin-top">Comece Agora</button>
</header>
<div id="home" class="w3-padding-64 w3-container w3-row-padding">
 <div class="w3-content">
 <div class="w3-twothird">
 <h1>Segure seu dispositivo e informações online</h1>
 <p class="w3-text-grey">Aqui você encontrará dicas importantes para manter sua segurança online.</p>
 <ul>
 <li>
 <i class="fa fa-check-circle fa-fw w3-margin-right w3-text-green"></i>Evite e-mails e SMS suspeitos
 </li>
 <li>
 <i class="fa fa-times-circle fa-fw w3-margin-right w3-text-red"></i>Evite cookies maliciosos
 </li>
 <li>
 <i class="fa fa-cloud-download fa-fw w3-margin-right w3-text-blue"></i>Realize backup dos seus dados
 </li>
 </ul>
 </div>
 <div class="w3-third w3-center">
 <img src="https://res.cloudinary.com/dlq7h4tbr/image/upload/v1717562055/Intellimaker/c466339e-4ee0-4a21-8fa8-e5fc1750a312-pexels-luis-gomes-166706-546819.jpg.jpg" alt="Segurança online" class="w3-image">
 </div>
 </div>
</div>
<div id="sobre" class="w3-padding-64 w3-container w3-row-padding w3-light-grey">
 <div class="w3-content">
 <h1>Sobre Nós</h1>
 <p>
 Somos estudantes da Universidade Estadual de Montes Claros (Unimontes) do curso de Sistemas de Informação. Este site é um projeto para a disciplina de Mineração de Dados com o objetivo de conscientizar o público geral sobre a necessidade de proteger sua privacidade enquanto navega na internet.
 </p>
 </div>
</div>
<div id="contato" class="w3-padding-64 w3-container w3-center w3-opacity w3-black">
 <h1 class="w3-xlarge w3-margin">Entre em contato</h1>
 <form>
 <div class="w3-row-padding">
 <div class="w3-half w3-padding">
 <label>Nome:</label>
 <input class="w3-input w3-border w3-round w3-margin-bottom" type="text"></input>
 </div>
 <div class="w3-half w3-padding">
 <label>Email:</label>
 <input class="w3-input w3-border w3-round w3-margin-bottom" type="email"></input>
 </div>
 </div>
 <label>Dúvida:</label>
 <textarea class="w3-input w3-border w3-round w3-margin-bottom" rows="4"></textarea>
 <button class="w3-button w3-padding-large w3-large w3-black w3-margin-top">Enviar</button>
 </form>
 <p>Contate-nos no email: <a href="mailto:si@localtest.dev">si@localtest.dev</a></p>
</div>
<div id="servicos" class="w3-padding-64 w3-container w3-row-padding w3-light-grey">
 <div class="w3-content">
 <h1>Nossos Serviços</h1>
 <p>
 Nossos serviços são projetados para aumentar sua segurança online. Aqui alguns benefícios que você pode obter:</p>
 <ul>
 <li>
 <i class="fa fa-check-circle fa-fw w3-margin-right w3-text-green"></i>Proteção contra e-mails fraudulentos
 </li>
 <li>
 <i class="fa fa-check-circle fa-fw w3-margin-right w3-text-green"></i>Proteção contra cookies maliciosos
 </li>
 <li>
 <i class="fa fa-check-circle fa-fw w3-margin-right w3-text-green"></i>Proteção contra SMS suspeitos
 </li>
 </ul>
 </div>
</div>
<div id="recursos" class="w3-padding-64 w3-container w3-row-padding w3-light-grey">
 <div class="w3-content">
 <h1>Recursos Adicionais</h1>
 <p>
 Aqui encontrará recursos adicionais que podem ser úteis para manter sua segurança online:</p>
 <ul>
 <li>
 <i class="fa fa-file-pdf-o fa-fw w3-margin-right w3-text-red"></i><a href="#">Downloads</a>
 </li>
 <li>
 <i class="fa fa-pencil-square-o fa-fw w3-margin-right w3-text-red"></i><a href="#">Artigos</a>
 </li>
 <li>
 <i class="fa fa-blog fa-fw w3-margin-right w3-text-red"></i><a href="#">Blog</a>
 </li>
 </ul>
 </div>
</div>
<footer class="w3-padding-64 w3-container w3-center w3-opacity">
 <div class="w3-padding-32 w3-xlarge">
 <i class="fa fa-facebook-official fa-fw w3-hover-opacity"></i> <i class="fa fa-instagram fa-fw w3-hover-opacity"></i> <i class="fa fa-snapchat-square fa-fw w3-hover-opacity"></i> <i class="fa fa-pinterest-p fa-fw w3-hover-opacity"></i> <i class="fa fa-twitter fa-fw w3-hover-opacity"></i> <i class="fa fa-linkedin fa-fw w3-hover-opacity"></i>
 </div>
 <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
</footer>
<script>
 function myFunction() {
 var x = document.getElementById("navDemo");
 if (x.className.indexOf("w3-show") === -1) {
 x.className += " w3-show";
 } else {
 x.className = x.className.replace(" w3-show", "");
 }
 }
</script>
</html"""

context_str = """
content:  Sim, eu posso extrair todo o conteúdo e os textos definidos pela pessoa, palavra por palavra, que devem ser adicionados ao site. Abaixo, você encontrará os textos organizados conforme as páginas desejadas:

Página Inicial:
---
- E-mails fraudulentos:
Mantenha atenção se receber e-mails cujo remetente é desconhecido, apresenta erros de digitação ou tem anexos suspeitos. Exclua-os imediatamente.

- SMS suspeitos:
Caso receba algum tipo de SMS suspeito, solicitando pagamentos inesperados ou dados pessoais para cancelamento de compras que não foram feitas, não abra nenhum link e apague-os.

- Cookies maliciosos:
Certifique-se de utilizar extensões ou navegadores mais seguros para bloquear cookies que podem ser usados de maneira ilícita, rastreando ou coletando suas informações pessoais.

- Perda de dados:
Realize backup dos seus dados importantes, para manter-los sempre seguros, seja por necessidade de formatação do aparelho, perda de informações ou até mesmo roubo de dados. Algumas ferramentas utilizadas para isso são Google Drive, Samsung Cloud ou iCloud.

- Alterar senhas:
Altere as senhas regularesmente nas contas, especialmente naqueles que são acessadas nos dispositivos da Unimontes. Utilize senhas diferentes para cada conta e evite usar datas de aniversário, nomes e informações relacionadas a amigos e familiares. Use um gerenciador de senhas para armazená-las e gerá-las de forma segura, garantindo que você não as esqueça e aumentando a segurança das suas contas.

- Verificação em Duas Etapas:
Ative a verificação em duas etapas nas contas para aumentar a segurança e tornar mais difícil para invasores acessarem suas informações sem autorização.

- Cuidado com Redes Wi-Fi Públicas:
Evite utilizar redes públicas não seguras para realizar transações bancárias ou compartilhar informações pessoais, pois há risco de invasões por hackers.

- Vazamento de dados pessoais:
Utilize serviços confiáveis e limite a quantidade de informações pessoais fornecidas online.

- Verifique a URL:
Antes de clicar em um link, passe o cursor do mouse sobre ele para ver o endereço completo (URL) e certifique-se que a URL corresponda ao site que você espera visitar. URLs suspeitas, com erros ortográficos ou caracteres estranhos, podem indicar phishing ou sites maliciosos.

- Certifique-se da realização do logout em computadores públicos:
Ao terminar a utilização de computadores públicos ou quando mais alguém além de você utilizá-los, lembre-se de sair da sua conta Google ou em outros serviços para que você não fique vulnerável a exposição de seus dados privados.

- Malware em aplicativos:
Evite baixar arquivos e aplicativos de fontes não confiáveis na web. Essas aplicações duvidosas podem possuir malwares (softwares maliciosos) que podem danificar seu aparelho, roubar dados sensíveis e usar outras formas de comprometer seu equipamento. Desenvolva a habitude de instalar apenas aplicativos de lojas/sites oficiais e mantenha seu dispositivo atualizado em relação a serviços de proteção de dados como antivírus.

- Aplicativos de segurança:
Um exemplo é o Duo Mobile, que é um aplicativo de autenticação de dois fatores amplamente utilizado para adicionar uma camada extra de segurança ao fazer login em várias contas online, como e-mails, redes sociais, serviços bancários e muitos outros. Seu principal benefício é aumentar a segurança das suas contas, tornando mais difícil para hackers e invasores acessarem suas informações mesmo que tenham sua senha.

- Phishing - O que é e como se prevenir:
Phishing é um ataque que tenta roubar seu dinheiro ou sua identidade fazendo com que você revele informações pessoais, tais como números de cartão de crédito, informações bancárias ou senhas em sites que fingem ser legítimos. Instituições legítimas geralmente não solicitem essas informações por telefone, portanto, é importante pensar duas vezes antes de prosseguir com esse tipo de procedimento.

- Segurança física dos dispositivos tecnológicos pessoais:
Mantenha seus dispositivos físicos seguros, como laptops e smartphones, por meio do uso de travas de tela, armazenamento seguro e precauções contra roubo, é tão importante quanto qualquer outra medida de segurança.

- Atualização de softwares:
Desenvolvedores dos softwares e aplicativos que usamos no dia a dia frequentemente implementam atualizações que melhoram a segurança do produto, portanto, é importante se atentar a manter todos os softwares e aplicativos atualizados para corrigir vulnerabilidades de segurança conhecidas.

- Métodos de acesso mais seguros/proteção extra:
Promova o uso de métodos de autenticação biométrica, como impressão digital ou reconhecimento facial, sempre que possível, para adicionar uma camada extra de segurança.

- Riscos associados aos dispositivos de armazenamento removíveis:
Oriente-se sobre os riscos associados a esses dispositivos, como pen drives e cartões de memória, e a importância de escanear esses dispositivos em busca de malware antes de usá-los em sistemas confiáveis.
---

Página Sobre Nós:
---
Somos alunos da Universidade Estadual de Montes Claros (Unimontes) do curso de Sistemas de Informação. Esse site é um projeto para a disciplina de Mineração de Dados com o objetivo de conscientizar o público geral sobre a necessidade de proteger a sua privacidade enquanto navega na internet.
---

Página Contato:
---
Formulário de contato com os campos seguintes:
- Nome:
- Email:
- Dúvida:

Envie as informações preenchidas no formulário para o email si@localtest.dev.

requirements:  Entendido, você deseja criar um site estático chamado "Guia Prático de Segurança Online" com as seguintes páginas:

#b71c1c e #d9d9d9. Nela, desejamos incluir:
1. Home: Criaremos uma página inicial engajante e clara com os objetivos e ofertas do site, utilizando as cores
   - Um breve texto descrevendo o que a página web oferece e os benefícios para os visitantes.
   - Imagens relevantes ou engraçadas que representem a temática da segurança online.
   - Links direcionados para as páginas "Sobre Nós" e "Contato" para facilitar a navegação do visitante pelo site.
   - Qualquer outra informação importante que deseja mostrar nessa página inicial.

2. Sobre Nós: Propondo criar uma página "Sobre Nós" para compartilhar informações sobre a equipe, instituição, missão, visão e metas do site. Nela, desejamos incluir:
   - Identificação da equipe: nome dos membros e funções (se aplicável).
   - Instituição: informações sobre a Universidade Estadual de Montes Claros e o curso de Sistemas de Informação.
   - Objetivo do site: conscientizar o público geral sobre a necessidade de proteger sua privacidade enquanto navega na internet.
   - Missão, visão ou metas do site (se aplicável).

3. Contato: Recomendamos incluir uma página "Contato" para facilitar a comunicação entre os visitantes e você. Nela, desejamos incluir:
   - Um formulário de contato com campos para nome, email e área para as duvidas (se desejado).
   - O email de destino (si@localtest.dev).

4. Serviços ou produtos (opcional): Recomendamos adicionar essa página se houver serviços ou produtos relacionados à segurança online para apresentá-los e detalhar as características e benefícios.

5. Recursos adicionais (opcional): Existe qualquer recurso específico desejado, como downloads, artigos ou blogs, ou ferramentas interativas? Isso nos dará uma melhor ideia da estrutura e exigências de desenvolvimento do site.

Se houver alguma coisa adicional que deseja incluir no site, por favor, informe-nos com antecedência para que possamos incluí-la durante o desenvolvimento do site estático "Guia Prático de Segurança Online".
"""

orig_instruction = """
<s>[INST] You are a website developer. Do the following task:[/INST]</s>[INST] Write a complete website using HTML, CSS and Javascript to meet the following requirements: 1. Home: Criaremos uma página inicial engajante e clara com os objetivos e ofertas do site, utilizando as cores #b71c1c e #d9d9d9. Nela, desejamos incluir:
   - Um breve texto descrevendo o que a página web oferece e os benefícios para os visitantes.
   - Imagens relevantes ou engraçadas que representem a temática da segurança online.
   - Links direcionados para as páginas 'Sobre Nós' e 'Contato' para facilitar a navegação do visitante pelo site.
   - Qualquer outra informação importante que deseja mostrar nessa página inicial.

2. Sobre Nós: Propondo criar uma página 'Sobre Nós' para compartilhar informações sobre a equipe, instituição, missão, visão e metas do site. Nela, desejamos incluir:
   - Identificação da equipe: nome dos membros e funções (se aplicável).
   - Instituição: informações sobre a Universidade Estadual de Montes Claros e o curso de Sistemas de Informação.
   - Objetivo do site: conscientizar o público geral sobre a necessidade de proteger sua privacidade enquanto navega na internet.
   - Missão, visão ou metas do site (se aplicável).

3. Contato: Recomendamos incluir uma página 'Contato' para facilitar a comunicação entre os visitantes e você. Nela, desejamos incluir:
   - Um formulário de contato com campos para nome, email e área para as duvidas (se desejado).
   - O email de destino (si@localtest.dev).

4. Serviços ou produtos (opcional): Recomendamos adicionar essa página se houver serviços ou produtos relacionados à segurança online para apresentá-los e detalhar as características e benefícios.

5. Recursos adicionais (opcional): Existe qualquer recurso específico desejado, como downloads, artigos ou blogs, ou ferramentas interativas? Isso nos dará uma melhor ideia da estrutura e exigências de desenvolvimento do site.

Se houver alguma coisa adicional que deseja incluir no site, por favor, informe-nos com antecedência para que possamos incluí-la durante o desenvolvimento do site estático 'Guia Prático de Segurança Online'. and fill it with this content: Página Inicial:
---
- E-mails fraudulentos:
Mantenha atenção se receber e-mails cujo remetente é desconhecido, apresenta erros de digitação ou tem anexos suspeitos. Exclua-os imediatamente.

- SMS suspeitos:
Caso receba algum tipo de SMS suspeito, solicitando pagamentos inesperados ou dados pessoais para cancelamento de compras que não foram feitas, não abra nenhum link e apague-os.

- Cookies maliciosos:
Certifique-se de utilizar extensões ou navegadores mais seguros para bloquear cookies que podem ser usados de maneira ilícita, rastreando ou coletando suas informações pessoais.

- Perda de dados:
Realize backup dos seus dados importantes, para manter-los sempre seguros, seja por necessidade de formatação do aparelho, perda de informações ou até mesmo roubo de dados. Algumas ferramentas utilizadas para isso são Google Drive, Samsung Cloud ou iCloud.

- Alterar senhas:
Altere as senhas regularesmente nas contas, especialmente naqueles que são acessadas nos dispositivos da Unimontes. Utilize senhas diferentes para cada conta e evite usar datas de aniversário, nomes e informações relacionadas a amigos e familiares. Use um gerenciador de senhas para armazená-las e gerá-las de forma segura, garantindo que você não as esqueça e aumentando a segurança das suas contas.

- Verificação em Duas Etapas:
Ative a verificação em duas etapas nas contas para aumentar a segurança e tornar mais difícil para invasores acessarem suas informações sem autorização.

- Cuidado com Redes Wi-Fi Públicas:
Evite utilizar redes públicas não seguras para realizar transações bancárias ou compartilhar informações pessoais, pois há risco de invasões por hackers.

- Vazamento de dados pessoais:
Utilize serviços confiáveis e limite a quantidade de informações pessoais fornecidas online.

- Verifique a URL:
Antes de clicar em um link, passe o cursor do mouse sobre ele para ver o endereço completo (URL) e certifique-se que a URL corresponda ao site que você espera visitar. URLs suspeitas, com erros ortográficos ou caracteres estranhos, podem indicar phishing ou sites maliciosos.

- Certifique-se da realização do logout em computadores públicos:
Ao terminar a utilização de computadores públicos ou quando mais alguém além de você utilizá-los, lembre-se de sair da sua conta Google ou em outros serviços para que você não fique vulnerável a exposição de seus dados privados.

- Malware em aplicativos:
Evite baixar arquivos e aplicativos de fontes não confiáveis na web. Essas aplicações duvidosas podem possuir malwares (softwares maliciosos) que podem danificar seu aparelho, roubar dados sensíveis e usar outras formas de comprometer seu equipamento. Desenvolva a habitude de instalar apenas aplicativos de lojas/sites oficiais e mantenha seu dispositivo atualizado em relação a serviços de proteção de dados como antivírus.

- Aplicativos de segurança:
Um exemplo é o Duo Mobile, que é um aplicativo de autenticação de dois fatores amplamente utilizado para adicionar uma camada extra de segurança ao fazer login em várias contas online, como e-mails, redes sociais, serviços bancários e muitos outros. Seu principal benefício é aumentar a segurança das suas contas, tornando mais difícil para hackers e invasores acessarem suas informações mesmo que tenham sua senha.

- Phishing - O que é e como se prevenir:
Phishing é um ataque que tenta roubar seu dinheiro ou sua identidade fazendo com que você revele informações pessoais, tais como números de cartão de crédito, informações bancárias ou senhas em sites que fingem ser legítimos. Instituições legítimas geralmente não solicitem essas informações por telefone, portanto, é importante pensar duas vezes antes de prosseguir com esse tipo de procedimento.

- Segurança física dos dispositivos tecnológicos pessoais:
Mantenha seus dispositivos físicos seguros, como laptops e smartphones, por meio do uso de travas de tela, armazenamento seguro e precauções contra roubo, é tão importante quanto qualquer outra medida de segurança.

- Atualização de softwares:
Desenvolvedores dos softwares e aplicativos que usamos no dia a dia frequentemente implementam atualizações que melhoram a segurança do produto, portanto, é importante se atentar a manter todos os softwares e aplicativos atualizados para corrigir vulnerabilidades de segurança conhecidas.

- Métodos de acesso mais seguros/proteção extra:
Promova o uso de métodos de autenticação biométrica, como impressão digital ou reconhecimento facial, sempre que possível, para adicionar uma camada extra de segurança.

- Riscos associados aos dispositivos de armazenamento removíveis:
Oriente-se sobre os riscos associados a esses dispositivos, como pen drives e cartões de memória, e a importância de escanear esses dispositivos em busca de malware antes de usá-los em sistemas confiáveis.
---

Página Sobre Nós:
---
Somos alunos da Universidade Estadual de Montes Claros (Unimontes) do curso de Sistemas de Informação. Esse site é um projeto para a disciplina de Mineração de Dados com o objetivo de conscientizar o público geral sobre a necessidade de proteger a sua privacidade enquanto navega na internet.
---

Página Contato:
---
Formulário de contato com os campos seguintes:
- Nome:
- Email:
- Dúvida:

Envie as informações preenchidas no formulário para o email si@localtest.dev.. Insert the following images links in the website: https://res.cloudinary.com/dlq7h4tbr/image/upload/v1717604193/Intellimaker/14c398b8-d1e2-4c5d-a076-d34fe6b08f0d-pexels-luis-gomes-166706-546819.jpg.jpg,https://res.cloudinary.com/dlq7h4tbr/image/upload/v1717604194/Intellimaker/e545968a-4847-4dca-862c-ba095ed5420d-pexels-pixabay-60504.jpg.jpg. Do not write additional commentaries. Feel free to use libs if they come from a CDN. The content of the website should be written in Portuguese from Brazil. Just generate the HTML without explanations.
    Use this template: <!doctypehtml><html lang=en><title>W3.CSS Templa</title><meta charset=UTF-8><meta content='width=device-width,initial-scale=1'name=viewport><link href=https://www.w3schools.com/w3css/4/w3.css rel=stylesheet><link href='https://fonts.googleapis.com/css?family=Lato'rel=stylesheet><link href='https://fonts.googleapis.com/css?family=Montserrat'rel=stylesheet><link href=https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css rel=stylesheet><style>body,h1,h2,h3,h4,h5,h6{font-family:Lato,sans-serif}.w3-bar,button,h1{font-family:Montserrat,sans-serif}.fa-anchor,.fa-coffee{font-size:200px}</style><div class=w3-top><div class='w3-large w3-bar w3-card w3-left-align w3-red'><a href=javascript:void(0); class='w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-large w3-hide-medium w3-large w3-red w3-right'onclick=myFunction() title='Toggle Navigation Menu'><i class='fa fa-bars'></i></a> <a href=# class='w3-button w3-padding-large w3-bar-item w3-white'>Home</a> <a href=# class='w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-small'>Link 1</a> <a href=# class='w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-small'>Link 2</a> <a href=# class='w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-small'>Link 3</a> <a href=# class='w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-small'>Link 4</a></div><div class='w3-large w3-hide-large w3-hide-medium w3-bar-block w3-hide w3-white'id=navDemo><a href=# class='w3-button w3-padding-large w3-bar-item'>Link 1</a> <a href=# class='w3-button w3-padding-large w3-bar-item'>Link 2</a> <a href=# class='w3-button w3-padding-large w3-bar-item'>Link 3</a> <a href=# class='w3-button w3-padding-large w3-bar-item'>Link 4</a></div></div><header class='w3-center w3-container w3-red'style='padding:128px 16px'><h1 class='w3-margin w3-jumbo'>START PAGE</h1><p class=w3-xlarge>Template by w3.css</p><button class='w3-button w3-padding-large w3-large w3-black w3-margin-top'>Get Started</button></header><div class='w3-padding-64 w3-container w3-row-padding'><div class=w3-content><div class=w3-twothird><h1>Lorem Ipsum</h1><h5 class=w3-padding-32>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h5><p class=w3-text-grey>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div><div class='w3-center w3-third'><i class='fa w3-padding-64 w3-text-red fa-anchor'></i></div></div></div><div class='w3-padding-64 w3-container w3-row-padding w3-light-grey'><div class=w3-content><div class='w3-center w3-third'><i class='fa w3-padding-64 w3-text-red fa-coffee w3-margin-right'></i></div><div class=w3-twothird><h1>Lorem Ipsum</h1><h5 class=w3-padding-32>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h5><p class=w3-text-grey>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div></div></div><div class='w3-padding-64 w3-container w3-center w3-opacity w3-black'><h1 class='w3-xlarge w3-margin'>Quote of the day: live life</h1></div><footer class='w3-padding-64 w3-container w3-center w3-opacity'><div class='w3-padding-32 w3-xlarge'><i class='fa w3-hover-opacity fa-facebook-official'></i> <i class='fa w3-hover-opacity fa-instagram'></i> <i class='fa w3-hover-opacity fa-snapchat'></i> <i class='fa w3-hover-opacity fa-pinterest-p'></i> <i class='fa w3-hover-opacity fa-twitter'></i> <i class='fa w3-hover-opacity fa-linkedin'></i></div><p>Powered by <a href=https://www.w3schools.com/w3css/default.asp target=_blank>w3.css</a></footer><script>function myFunction(){var e=document.getElementById('navDemo');-1==e.className.indexOf('w3-show')?e.className+=' w3-show':e.className=e.className.replace(' w3-show','')}</script>. Don't forget to replace the template colors. Be creative.
     [/INST]
"""

orig_response = """
 <!doctype html>
<html lang="pt-br">
<head>
 <title>Guia Prático de Segurança Online</title>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
 <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
 <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
 <style>
 body, h1, h2, h3, h4, h5, h6 {
 font-family: Lato, sans-serif;
 }
 .w3-bar, button, h1 {
 font-family: Montserrat, sans-serif;
 }
 .fa-anchor, .fa-coffee {
 font-size: 200px;
 }
 </style>
</head>
<body>
 <div class="w3-top">
 <div class="w3-large w3-bar w3-card w3-left-align w3-red">
 <a class="w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-large w3-hide-medium w3-large w3-red w3-right" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
 <a class="w3-button w3-padding-large w3-bar-item w3-white" href="#">Home</a>
 <a class="w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-small" href="#">Sobre Nós</a>
 <a class="w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-small" href="#">Contato</a>
 <a class="w3-button w3-padding-large w3-bar-item w3-hover-white w3-hide-small" href="#">Serviços</a>
 </div>
 <div class="w3-large w3-hide-large w3-hide-medium w3-bar-block w3-hide w3-white" id="navDemo">
 <a class="w3-button w3-padding-large w3-bar-item" href="#">Sobre Nós</a>
 <a class="w3-button w3-padding-large w3-bar-item" href="#">Contato</a>
 <a class="w3-button w3-padding-large w3-bar-item" href="#">Serviços</a>
 </div>
</div>
 <header class="w3-center w3-container w3-red" style="padding:128px 16px">
 <h1 class="w3-margin w3-jumbo">Guia Prático de Segurança Online</h1>
 <p class="w3-xlarge">Fique informado sobre as melhores práticas para proteger sua privacidade online</p>
 <button class="w3-button w3-padding-large w3-large w3-black w3-margin-top" onclick="myFunction()">Veja mais</button>
 </header>
 <div class="w3-padding-64 w3-container w3-row-padding">
 <div class="w3-content">
 <div class="w3-twothird">
 <h1>Práticas Seguras Online</h1>
 <p class="w3-text-grey">Segure-se das seguintes práticas para manter sua privacidade online:</p>
 <ul>
 <li>
 <h3>E-mails fraudulentos</h3>
 <p>Mantenha atenção se receber e-mails cujo remetente é desconhecido, apresenta erros de digitação ou tem anexos suspeitos.</p>
 </li>
 <li>
 <h3>SMS suspeitos</h3>
 <p>Caso receba algum tipo de SMS suspeito, solicite informações sobre o remetente e não abra nenhum link.</p>
 </li>
 <li>
 <h3>Cookies maliciosos</h3>
 <p>Use extensões ou navegadores seguros para bloquear cookies que podem ser usados de maneira ilícita, rastreando ou coletando suas informações.</p>
 </li>
 </ul>
 </div>
 <div class="w3-third">
 <img src="https://res.cloudinary.com/dlq7h4tbr/image/upload/v1717604193/Intellimaker/14c398b8-d1e2-4c5d-a076-d34fe6b08f0d-pexels-luis-gomes-166706-546819.jpg.jpg" alt="Segurança Online" class="w3-round w3-image w3-center">
 </div>
 </div>
 </div>
 <div class="w3-padding-64 w3-container w3-row-padding w3-light-grey">
 <div class="w3-content">
 <div class="w3-third">
 <img src="https://res.cloudinary.com/dlq7h4tbr/image/upload/v1717604194/Intellimaker/e545968a-4847-4dca-862c-ba095ed5420d-pexels-pixabay-60504.jpg.jpg" alt="Segurança Online" class="w3-round w3-image w3-center">
 </div>
 <div class="w3-twothird">
 <h1>Sobre Nós</h1>
 <p class="w3-text-grey">Nós somos alunos da Universidade Estadual de Montes Claros (Unimontes) do curso de Sistemas de Informação. Este site foi criado para a disciplina de Mineração de Dados com o objetivo de conscientizar o público geral sobre a necessidade de proteger sua privacidade enquanto navega na internet.</p>
 </div>
 </div>
 </div>
 <footer class="w3-padding-64 w3-container w3-center w3-opacity">
 <h1 class="w3-xlarge w3-margin">Obrigado por visitar nossa página</h1>
 </footer>
 <script>
 function myFunction() {
 var x = document.getElementById("navDemo");
 if (x.className.indexOf("w3-show") == -1) {
 x.className += " w3-show";
 } else {
 x.className = x.className.replace(" w3-show", "");
 }
 }
 </script>
</body>
</html>
"""

prometheus_absolute_grading_template = PromptTemplate.from_template("""
    <s>[INST] You are a fair judge assistant tasked with providing clear, objective feedback based on specific criteria, ensuring each assessment reflects the absolute standards set for performance. 
    ###Task Description:
    An instruction (might include an Input inside it), a response to evaluate, a reference answer that gets a score of 5, and a score rubric representing a evaluation criteria are given.
    1. Write a detailed feedback that assess the quality of the response strictly based on the given score rubric, not evaluating in general.
    2. After writing a feedback, write a score that is an integer between 1 and 5. You should refer to the score rubric.
    3. The output format should look as follows: \"Feedback: (write a feedback for criteria) [RESULT] (an integer number between 1 and 5)\"
    4. Please do not generate any other opening, closing, and explanations.

    ###The instruction to evaluate:
    {orig_instruction}

    ###Response to evaluate:
    {orig_response}

    ###Reference Answer (Score 5):
    No reference answer

    ###Score Rubrics:
    Criteria: Does this answer follows the requirements and contain the contents requested by the user?
    Score 1: "The model could not generate an html"
    Score 2: "The model follows partially the requirements and do not include all the content"
    Score 3: "The model follows partially the requirements and include the content partially",
    Score 4: "The model fully follows the requirements and includes the content in the HTML partially"
    Score 5: "The model fully follows the requirements and includes all the requested content"

    ###Feedback: [/INST]""")

prompt_formatted = prometheus_absolute_grading_template.format(
    orig_instruction=orig_instruction,
    orig_response=orig_response
)

result = chat_llm(prompt_formatted, max_tokens=None)
print('result', result["choices"][0]["text"])
