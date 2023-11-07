<h3>【Next.js・Firebase】営業管理効率化コミュニケーションサイトを作りました！</h3>

![841001DB-086B-468D-B733-2C889202997C](https://github.com/daisuke0224/portfolio/assets/133018370/c654d2e6-64c5-46e3-a6ce-6dd41e3ddf30)

## はじめに

こちらの記事では、Next.js と Firebase を用いて開発したポートフォリオについて記載しています。
機能の追加・修正は随時対応中になります。（2023 年 10 月 31 日）

## アプリの概要

「当アプリは、営業管理をより効率的かつ簡単に行えるプラットフォームです。
管理者と営業マンの両方が、進捗管理や営業報告を効果的に行えるツールとして設計しています。

以下の特徴があります

- 簡潔なダッシュボード：進捗や成果を一目で確認できる直感的なダッシュボードになります。
- ユーザーフレンドリーなインターフェース：シンプルかつ使いやすいデザインで、新規ユーザーも簡単に利用できます。
- カスタマイズ可能なタスク管理：営業活動や商談に関するタスクをカスタマイズし、効率的に管理と確認ができます。
  営業管理者と営業マンのニーズにあわせ、コミュニケーションを効率化します。

## 想定ユーザー

- 営業管理者・営業マンの方
- 営業進捗管理を Excel で行っている方
- 現在使用している営業管理ツールが複雑で浸透しない方
- 一つのサイトで自身・チームの営業確認やタスク管理をしたい方

## ポートフォリオの制作背景

現在の営業職では、Excel を用いた営業管理や、会社導入の顧客管理ツールを使用してきました。しかし、顧客管理ツールは入力項目が多く、必要のない情報も含まれており、結局のところ使いこなせずにいます。そのため、Excel との併用が必要で、業務の効率が低下していました。

この課題に対処するため、必要な情報のみをシンプルに入力でき、さらにミーティングなどでも活用できる実用的な Web アプリを開発しました。業務を簡素化し、生産性を向上させることを目指しています。

さらに、今後はチャット機能や DOCSBOT の導入等を計画しており、より実用的で効率的な Web アプリに発展させる予定です。

## 機能一覧

![機能一覧](https://github.com/daisuke0224/portfolio/assets/133018370/5da03cfc-070b-44e0-9b38-3116faff9641)

**※今後実装予定**

![今後実装予定](https://github.com/daisuke0224/portfolio/assets/133018370/d6d83919-7b37-4a97-ab53-6d0581866feb)

## 使用技術

- React.js(NEXT.js)
- TypeScript
- Material-UI
- Firebase(Authentication、Firestore、Storage、Hosting、Functions)
- zapier
- GitHub

## インフラ環境

![インフラ環境](https://github.com/daisuke0224/portfolio/assets/133018370/98c8b692-2a90-4f0a-9927-2d82909d71b1)

## このアプリについて

<h3>1.トップ画面</h3>

![トップ画面](https://github.com/daisuke0224/portfolio/assets/133018370/81f4dec0-e4a1-4cf1-9955-9e55d278d96b)

- トップページにアクセスするとこの画面が描画されます。
- 利用がはじめての方は管理者用アカウント作成画面へ誘導します。
- アカウントがある方はログインページへ移動いただきます。

<h3>2.管理者アカウント登録ページ</h3>

![管理者アカウント登録ページ](https://github.com/daisuke0224/portfolio/assets/133018370/5e78d1ad-5be6-4896-96df-8addf373cdbe)

- 管理者アカウント登録ページになります。
- 名前、メールアドレス、パスワード、（画像を登録したい場合は画像を選択）を入力してアカウント登録します。
- アカウント登録と同時にアカウント情報を Firebase Authentication に保存しています。

```
※以下URLにコードを書いています。
https://github.com/daisuke0224/portfolio/blob/main/src/app/SignUp/page.tsx
```

<h3>3.ログインページ（アカウント認証）</h3>
<h3>(mail:test@gmail.com pass:12345678)</h3>

![ログイン](https://github.com/daisuke0224/portfolio/assets/133018370/d6259b98-e157-4e7e-a2eb-abdd3abc7a77)

- メールアドレス、パスワードを入力することでログインします。
- アラートが表示されてページ遷移します。（ホーム画面に遷移します）
- メールアドレス、パスワードが一致しない場合、エラーアラートが表示されて、ログインは出来ません。

```
※以下URLにコードを書いています。
https://github.com/daisuke0224/portfolio/blob/main/src/app/login/page.tsx
```

<h3>4.パスワード再発行画面</h3>

![パスワード再発行画面](https://github.com/daisuke0224/portfolio/assets/133018370/b580b026-4c55-45f4-a327-7d01dd1ce791)

- パスワードを忘れた方は、再発行画面からパスワードを再発行することが可能です。
- 登録のメールアドレスにメールにて変更を行える URL が送信されます。

```
※以下URLにコードを書いています。
https://github.com/daisuke0224/portfolio/blob/main/src/app/passwordreissue/page.tsx
```

<h3>5.ホーム画面</h3>

![ホーム画面](https://github.com/daisuke0224/portfolio/assets/133018370/f85679ab-a8c3-413b-8bea-582c1af92407)

- ホーム画面では、案件入力・案件一覧・マイページ・管理者は管理者ページ・お問合せへ飛ぶことができます。
- ログアウトもできます。
- また、収入目標・現在の獲得金額・残りの不足金額の確認から、グラフで獲得・商談中・各メンバー毎の獲得・商談中・失注の案件と金額数を確認できます。
- タスク管理もできます。

<h3>6.管理者メニュー</h3>

![管理者メニュー](https://github.com/daisuke0224/portfolio/assets/133018370/a4da4230-1288-46f7-b4c4-8d6f758574a0)

- 管理者メニューは、ユーザー追加・ユーザー削除・営業目標数値入力が可能です。
- クリックするとページに遷移します。

<h3>7.管理者メニューユーザー追加ページ</h3>

![管理者メニューユーザー追加ページ](https://github.com/daisuke0224/portfolio/assets/133018370/f5e1f51f-f501-4be9-94a7-3c9e7e66ae99)

- 管理者は自身の管理するユーザーを管理者メニューより追加することが可能です。
- 名前、メールアドレス、パスワードを入力することでアカウントを作成することができます。
- アカウント登録と同時にアカウント情報を Firebase Authentication に保存しています。
- 管理者権限の為、functions にて実行。

```
※以下URLにコードを書いています。
https://github.com/daisuke0224/portfolio/blob/main/src/app/adduser/page.tsx
```

<h3>8.管理者メニューユーザー削除ページ</h3>

![管理者メニューユーザー削除ページ](https://github.com/daisuke0224/portfolio/assets/133018370/3e3321b6-4b40-4b6c-80f1-8a547e30e3d0)

- 自身の管理するユーザーのアカウントを削除することが出来ます。
- 管理者権限の為、functions にて実行。

```
※以下URLにコードを書いています。
https://github.com/daisuke0224/portfolio/blob/main/src/app/adminmenuuserdelete/page.tsx
```

<h3>9.管理者メニュー目標数値入力ページ</h3>

![目標数値入力](https://github.com/daisuke0224/portfolio/assets/133018370/6b31705b-f9c4-4aae-af39-70c9ed46876e)

- 自身の管理する目標数値を入力することができます。
- 入力により、ホームにて目標と現在の数値の管理が可能になります。

<h3>10.マイページ</h3>

![マイページ](https://github.com/daisuke0224/portfolio/assets/133018370/94447ab8-c174-43e7-9e8c-2f3805b61f09)

- 名前、メールアドレス、プロフィール画像の変更ができます。

<h3>11.案件入力ページ</h3>

![案件入力ページ](https://github.com/daisuke0224/portfolio/assets/133018370/d8d5cf80-0d14-4c26-8880-e77161fe9e98)

- 入力日・顧客名・案件名・販売商品名・見込個数・見込収入・交渉フラグ・コメントを入力し、登録することができます。
- Firestore に案件データを保存しています。

<h3>12.案件一覧ページ</h3>

![案件一覧](https://github.com/daisuke0224/portfolio/assets/133018370/a0de5757-89aa-409f-815f-85da572c1a46)

- 営業マン・顧客名・案件名・販売商品名・見込数・見込収入・交渉フラグ・コメントの確認ができます。
- 編集ページに移動することができます。
- 削除も行うことができます。削除ボタンを押すとダイアログにて削除の確認をします。

```Javascript
const [customerToDelete, setCustomerToDelete] = React.useState<string | null>(
　null
);
const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
　React.useState(false);
//削除
const handleDeleteCOnfirmed = async () => {
　try {
　//Firestoreから削除
　　if (customerToDelete !== null) {
    　await deleteDoc(doc(db, "customers", customerToDelete));
    　//削除が成功したら顧客リストを更新
    　const updatedCustomerList = customerList.filter(
    　　(customer) => customer.id !== customerToDelete
    　);
    　setCustomerList(updatedCustomerList);
    }
　} catch (error) {
    // console.log(error);
　} finally {
    //idとダイアログをリセット
    setCustomerToDelete(null);
    setIsConfirmationDialogOpen(false);
    }
  };

<TableHead>
　{customerToDelete && (
　　<Dialog
　　　open={isConfirmationDialogOpen}
     onClose={handleCloseDialog}
     aria-labelledby="alert-dialog-title"
     aria-describedby="alert-dialog-description"
   >
     <DialogTitle id="alert-dialog-title">削除の確認</DialogTitle>
     <DialogContent>
      <DialogContentText id="alert-dialog-description">
       本当に削除してもよろしいですか？
      </DialogContentText>
     </DialogContent>
     <DialogActions>
      <Button
        onClick={handleDeleteCOnfirmed}
        color="primary"
        autoFocus
      >
        はい
      </Button>
      <Button onClick={handleCloseDialog} color="primary">
        いいえ
      </Button>
     </DialogActions>
    </Dialog>
  )}
```

<h3>13.案件編集ページ</h3>

![案件編集](https://github.com/daisuke0224/portfolio/assets/133018370/c0104398-2161-4de2-b68a-4edb0077ddaf)

- 入力した案件を編集することができます。
- 登録されている入力内容が表示されているため、変更したい箇所のみ変更することが可能です。

<h3>14.お問合せページ</h3>

![D2D0D11C-0473-40C7-849E-9B1CEF4CB7FB](https://github.com/daisuke0224/portfolio/assets/133018370/6918c46a-0990-41f2-8082-75543d2f4dd2)

- お問い合わせフォームから送信が可能。
- Zapier を使用しており、管理者宛に slack にて通知がされます。

```
※以下URLにコードを書いています。
https://github.com/daisuke0224/portfolio/blob/main/src/app/contactform/page.tsx
```

<h3>15.バリデーション</h3>

![バリデーション1](https://github.com/daisuke0224/portfolio/assets/133018370/a1c3df19-649c-4899-8806-2fd7bf4aae35)

![バリデーション2](https://github.com/daisuke0224/portfolio/assets/133018370/81399ca9-c134-478c-916c-1a5916d5ad09)

- フォームの入力欄は必須項目に。
- 正規表現で、メールアドレスは @ を含める、パスワードは半角英数字を含んだ 8-20 文字の範囲で入力。
- 未入力時もエラーメッセージを表示。

```Javascript
<TextField
　id="お名前（必須）"
　label="お名前（必須）"
  variant="outlined"
  fullWidth
  color="secondary"
  sx={{ mb: 3 }}
  value={name}
  {...register("name", {
    required: "お名前を入力してください",
  })}
  onChange={(e) => setName(e.target.value)}
  helperText={errors.name?.message as React.ReactNode}
  error={!!errors.name}
/>
<TextField
  id="E-mailアドレス（必須）"
  label="E-mailアドレス（必須）"
  variant="outlined"
  fullWidth
  color="secondary"
  sx={{ mb: 3 }}
  value={mailaddress}
  {...register("mailaddress", {
   required: "E-mailアドレスを入力してください",
   pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "正しいE-mailアドレスを入力してください",
   },
  })}
  onChange={(e) => setMailAddress(e.target.value)}
  helperText={errors.mailaddress?.message as React.ReactNode}
  error={!!errors.mailaddress}
/>
<TextField
 　id="お問合せ内容（必須）"
   label="お問合せ内容（必須）"
   fullWidth
   multiline
   rows={10}
   sx={{ mb: 3 }}
   value={inquireyDetails}
   {...register("inquireyDetails", {
    required: "お問合せ内容を入力してください",
   })}
   onChange={(e) => setInquireyDetails(e.target.value)}
   helperText={
    errors.inquireyDetails?.message as React.ReactNode
   }
   error={!!errors.inquireyDetails}
/>
```

<h3>16.ユーザーへのヒアリング</h3>
- 案件を削除する事ができないから、削除ボタンをつけてほしい！

- 削除はできるようになったんだけど、クリックすると削除されてしまうのは間違ってしまうケースがあるので確認を 1 工程追加してほしい！

- 目標達成したら、マイナス表示になってしまうのは変更したほうが良いかもです。

◆ アプリを使用していただいたユーザーへヒアリングを行い、フィードバックをいただきました。

- ~~案件削除ボタン（対応済）~~
- ~~削除ボタンにダイアログにて確認の表示（対応済）~~
- ~~目標達成した際のマイナス表示を達成の表示に改善（対応済）~~

<h3>17.苦労したこと</h3>
<h4>Firestoreを使用した保存機能</h4>
user情報や案件情報などの保存にFirestoreを使用しました。用途に合わせたドキュメントを作成し、複数のコレクションから情報を取ってくる事もあり、自分自身がわからなくならないよう、コードの意味合いをコメントアウトで記述して振り返りができるようにしました。

<h4>グラフ機能の実装</h4>

管理者のチームに紐づいている営業マンのグラフ表示機能を、グラフは MUI・情報は Firestore を使用しました。画面の Mounting 時に情報がうまく取得できず、グラフの表示がなかなかできなかったため、苦戦しました。

上記のような困難な場面に何度も直面し、エラーの状況を経験することは珍しくありませんでした。このような状況に対処する際、さまざまな方法を試みました。新たな調査アプローチを模索することから、一度冷静になり、状況を整理し直すまで工夫をしました。調べても解決しない問題は、メンターの方に教えていただき確認をしてまいりました。これらの経験から、壁を乗り越える重要性を認識しました。また、時には一度立ち止まり、情報を整理することの大切さも学びました。

## 終わりに

以上、約 2 ヶ月かけて開発したポートフォリオについてまとめました。
このポートフォリオ作成を通じて、プロゲートや Udemy などのオンライン学習では得られない実践的な経験を積むことができました。実際に手を動かし、アプリを開発するプロセスを通じて、新たなスキルの習得により成長することができました。
このアプリの開発には、事前の 4 ヶ月にわたる学習期間と、実際のポートフォリオ作成に 2 ヶ月を費やしました。平均的な作業時間は 1 日に 2〜4 時間ほどでした。アプリにはまだ改善の余地が多く、今後はユーザーからのフィードバックを取り入れ、内容と機能を向上させ、より使いやすいものにしていきたいと考えています。
最後までご愛読していただき誠にありがとうございました。
