# 가상시착 서비스 I Lookbook의 비즈니스 코드입니다.

이 프로젝트는 호서대학교 해커톤 경진대회에서 출품된 작품입니다.
GAN을 이용하여 사용자가 시착을 통해서 보다 나은 구매 만족도를 제공하도록 하는 서비스이며, https://github.com/minar09/ACGPN 을 AI모델로 사용하였습니다.

<img width="520" alt="image" src="https://user-images.githubusercontent.com/82408159/216330994-d3362423-9326-498b-88e5-9e73d2fa7900.png">

AI모델의 불량한 데이터를 직접 솎아내는 전처리를 진행했으나 한개의 프로세스가 완료되기까지의 과정이 오래걸리고 디테일이 아쉬웠던 프로젝트입니다.


프로젝트 발표용 ppt : [링크](https://github.com/dev-daru/2021.09-ILookBook-vue-node.js/blob/main/ppt.pdf)


<h2>Need to install</h2>
npm install cors<br>
npm install dotenv<br>
npm install body-parser<br>
npm install jsonwebtoken<br>
npm install mysql<br>

2021/09/07 : cannot access https://registry.npmjs.org/body-parsernpm please use intelij installer<br>

if you got error no : -13 then<br>
try this : sudo npm install

Please check .env setting

Api Test : .env file develop="true"
<br>AccessToken : http://localhost:3000/user/refresh?token= <br>
LoginToken : http://localhost:3000/user/login?id=&pw=
