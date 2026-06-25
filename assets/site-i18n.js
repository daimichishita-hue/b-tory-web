(function(){
  var LANGS=["en","ja","zh","es"];
  var STORAGE_KEY="btory.preferredLanguage";

  function normalize(value){
    if(!value){return "";}
    var lang=String(value).trim().toLowerCase();
    if(lang.indexOf("ja")===0){return "ja";}
    if(lang.indexOf("zh")===0){return "zh";}
    if(lang.indexOf("es")===0){return "es";}
    if(lang.indexOf("en")===0){return "en";}
    return LANGS.indexOf(lang)>=0?lang:"";
  }

  function resolveLanguage(){
    var stored="";
    try{stored=normalize(localStorage.getItem(STORAGE_KEY));}catch(e){}
    if(stored){return stored;}

    var param=normalize(new URLSearchParams(window.location.search).get("lang"));
    if(param){return param;}

    var browserLangs=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""]);
    for(var i=0;i<browserLangs.length;i++){
      var picked=normalize(browserLangs[i]);
      if(picked){return picked;}
    }
    return "en";
  }

  function one(selector,root){return (root||document).querySelector(selector);}
  function all(selector,root){return Array.prototype.slice.call((root||document).querySelectorAll(selector));}
  function text(selector,value,root){all(selector,root).forEach(function(el){el.textContent=value;});}
  function html(selector,value,root){all(selector,root).forEach(function(el){el.innerHTML=value;});}
  function item(selector,index,value,root){var el=all(selector,root)[index];if(el){el.textContent=value;}}
  function itemHtml(selector,index,value,root){var el=all(selector,root)[index];if(el){el.innerHTML=value;}}
  function items(selector,values,root){all(selector,root).forEach(function(el,index){if(values[index]!==undefined){el.textContent=values[index];}});}
  function itemHtmls(selector,values,root){all(selector,root).forEach(function(el,index){if(values[index]!==undefined){el.innerHTML=values[index];}});}
  function attr(selector,name,value,root){all(selector,root).forEach(function(el){el.setAttribute(name,value);});}

  function setMeta(name,value){
    var el=document.querySelector('meta[name="'+name+'"]');
    if(el){el.setAttribute("content",value);}
  }
  function setProp(property,value){
    var el=document.querySelector('meta[property="'+property+'"]');
    if(el){el.setAttribute("content",value);}
  }

  function escapeHtml(value){
    return String(value).replace(/[&<>"']/g,function(char){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char];
    });
  }

  function heroTitle(firstLine,gradientPhrases){
    var phrases=Array.isArray(gradientPhrases)?gradientPhrases:[gradientPhrases];
    return '<span class="hero-line">'+escapeHtml(firstLine)+'</span> <span class="hero-line text-grad">'+phrases.map(function(phrase){return '<span class="hero-phrase hero-phrase--accent">'+escapeHtml(phrase)+'</span>';}).join("")+'</span>';
  }

  var COPY={
    en:{
      meta:{
        lang:"en",
        title:"B-tory | Salon inventory, ordering, receiving, and document management app",
        description:"B-tory is a local-first salon inventory app for managing stock, ordering, receiving, documents, and reports. Organize products by supplier, maker, and category with photos and barcodes.",
        ogTitle:"B-tory | Salon inventory, ordering, receiving, and document management app",
        ogDescription:"Inventory, ordering, receiving, documents, and reports in one local-first app for beauty salons. Built around photos, barcodes, suppliers, makers, and categories.",
        twitterDescription:"Inventory, ordering, receiving, documents, and reports in one local-first app for beauty salons.",
        locale:"en_US",
        schemaDescription:"A local-first beauty salon app for inventory, ordering, receiving, document management, and reports."
      },
      nav:["Features","How it works","Privacy","Support"],
      menuLabel:"Toggle menu",
      headerCta:"Download planned",
      hero:{
        eyebrow:"A salon management app inspired by real stylists.",
        title:heroTitle("Turn your phone into","a salon inventory tool."),
        subhead:"Reduce gaps from paper and spreadsheets. Manage inventory, orders, deliveries, and receipts in one workflow.",
        lead:"B-tory is a salon business app that can start from Excel/CSV or existing inventory lists, then add photos and barcodes. Organize products by supplier, maker, and category, review low-stock items, create order sheets, track waiting items, register receiving, and keep receipts in the flow of salon work.",
        cta:"Free Starter planned",
        guide:"View 30-day trial",
        support:"See how it works",
        note:"Planned to start with Free Starter. A 30-day Starter trial is also in preparation. Planned for iPhone / iPad / Mac / Windows."
      },
      download:{
        eyebrow:"Download",
        title:"Download",
        body:"B-tory is planned as iPhone, iPad, Mac, and Windows apps so it can fit both salon work and back-office work.",
        titles:["iPhone","iPad","Mac","Windows"],
        bodies:[
          "Check inventory, confirm barcodes, create orders, register receiving, and save receipts easily from your phone during salon hours.",
          "Use the larger tablet screen to review product lists, order details, and receiving entries more comfortably.",
          "A desktop app version planned for back-office work, including product organization, order review, and report checks on a larger screen.",
          "A Windows desktop app version is in preparation. It is planned for salon office work and inventory organization."
        ],
        buttons:["Coming soon on the Apple Store","Coming soon on the Apple Store","Coming soon on the Apple Store","Windows version in preparation"]
      },
      slides:{
        flowLabel:"B-tory feature showcase",
        controls:"Slide controls",
        dots:["Show brand slide","Show Excel/CSV import slide","Show photo registration slide","Show barcode slide","Show reorder slide","Show supplier ordering slide","Show receiving slide","Show documents and reports slide"],
        labels:["1 / 8 Brand","2 / 8 Excel / CSV","3 / 8 Photo registration","4 / 8 Barcode","5 / 8 Reorder","6 / 8 Supplier ordering","7 / 8 Receiving","8 / 8 Documents and reports"],
        brand:{
          kicker:["Salon inventory app","For salons"],
          title:"B-tory is inventory for beauty salons.",
          body:"A salon materials management app born from active hairstylists.",
          tags:["Inventory","Orders","Receiving","Documents"]
        },
        excel:{
          kicker:["Excel / CSV import","Start from Excel"],
          title:"Start from Excel, manage on your phone.",
          body:"Import from your existing inventory list, then add photos and barcodes later."
        },
        photo:{
          kicker:["Photo inventory","Photo registration"],
          title:"Easy to find with photos, easy to register.",
          body:"Color products, retail items, supplies. Manage products visually without guessing.",
          screenTitle:"Product entry",
          fields:["Color Cream 8N","Supplier: A Dealer"],
          stock:"Stock 4",
          card:["Photo management","No shelf hunting"]
        },
        barcode:{
          kicker:["Barcode check","Barcode"],
          title:"Check products quickly with barcodes.",
          body:"Scan during salon hours and check stock on the spot.",
          status:"Scanning",
          result:["Gloss Color 6P","Current stock 7"]
        },
        reorder:{
          kicker:["Reorder alert","Low stock"],
          title:"See what is running low at a glance.",
          body:"Products below the reorder point are easier to catch.",
          head:["Reorder","3 items"],
          rows:[["OX 6%","Only 1"],["Color 8N","Only 2"],["Gloves M","Only 1"]],
          badge:"Below reorder point"
        },
        dealer:{
          kicker:["Supplier ordering","By supplier"],
          title:"Group orders by supplier, right through to order sheets.",
          body:"Create order sheets and order messages by dealer.",
          suppliers:[["A Dealer","5 items"],["B Dealer","2 items"]],
          channels:["Excel","Email","LINE","WhatsApp"],
          note:"Review before sending"
        },
        delivery:{
          kicker:["Receiving flow","Receiving"],
          title:"When items arrive, receive them into stock.",
          body:"Track waiting, partial receiving, and completed receiving in one flow.",
          statuses:["Waiting","Partial","Received"],
          stock:["Stock","2 → 8"]
        },
        docs:{
          kicker:["Documents & report","Reports"],
          title:"Receipts and material cost are visible later.",
          body:"Save delivery notes, invoices, and receipts. Check material cost ratio and usage trends.",
          docs:["Delivery note","Invoice","Receipt"],
          report:"Material cost",
          trend:"Usage trend"
        }
      },
      problems:{
        eyebrow:"Simplify",
        title:"Make salon admin simpler with B-tory.",
        body:'Stock is hard to see, orders get scattered, documents go missing. B-tory turns salon materials management into a flow you can see, group, and keep.',
        before:["Before: Stock is hard to find","Before: Orders are scattered","Before: Deliveries are hard to track","Before: Documents go missing","Before: Costs are hard to see","Before: Management does not stick"],
        arrow:"With B-tory",
        titles:["See inventory and reorder status","Group orders by supplier","Manage waiting to received in one flow","Save delivery notes, receipts, and invoices","Check material cost and usage trends","Keep going easily on a phone"],
        bodies:["Reflect stock counts and adjustments so current quantities and low-stock items are easier to review in one list.","Organize low-stock items by dealer and create order sheets or order messages.","Move ordered items to waiting status, then receive arrivals into stock.","Save documents as photos or PDFs and find them later by order number, supplier, or product name.","Use inventory and usage data to understand material cost ratio and product trends.","Designed to be easy to use without a computer, even for solo and small salons."]
      },
      features:{
        eyebrow:"Features",
        title:"What B-tory can do",
        body:"Functions that fit the salon materials workflow and stay easy to use during business hours.",
        titles:["Inventory with photos and barcodes","Organize by supplier, maker, and category","Do not miss low-stock items","Create order sheets and order messages","Waiting and receiving registration","Save delivery notes, receipts, and invoices","Check material cost and usage trends","Save with JSON backup"],
        bodies:["Import from Excel/CSV, or register and check products with photos, barcodes, and QR codes.","Find products easily with classifications that fit your salon.","See products that are running low at a glance.","Standard, Excel, email, LINE, WhatsApp message drafts, and more.","Handle partial and full receiving and reflect it in stock.","Keep documents together and search them later.","Understand material cost and usage trends in reports.","Export data for safer storage and restore it when needed."]
      },
      difference:{
        eyebrow:"Why salons choose B-tory",
        title:"Make salon inventory work more efficient.",
        body:"Turn salon materials management scattered across paper, spreadsheets, and notes into a workflow that is easier to use on the floor.",
        titles:["Designed for real salon workflows","Start from Excel, manage on your phone","Reduce missed orders and delivery checks","Find receipts and delivery notes later"],
        bodies:["A salon materials app born from working stylists. From color products and retail items to supplies and receipts, it's designed to be used without hesitation in the flow of salon work.","Import products from Excel/CSV or existing inventory lists, then register and check items with photos and barcodes. Color products, retail items, and supplies are easier to find during salon hours.","Manage low-stock review, order sheets, waiting items, and receiving as one flow. Reduce missed orders and confirmation gaps that happen with paper or spreadsheets.","Save receipts, delivery notes, and invoices as photos or PDFs. Search later by order number, supplier, or product name for smoother materials management."],
        visualLabels:["Stock","Reorder","Waiting","Receipt","Excel / CSV","Product","Photo","Barcode","Stock 7","Reorder","Order sheet","Waiting","Receiving","Stock 2→8","Receipt","Delivery note","Invoice","Search","Material cost"]
      },
      workflow:{
        eyebrow:"How it works",
        title:"Basic flow",
        body:"From product registration to orders, receiving, and document storage. B-tory follows the flow of salon work.",
        titles:["Register products","Check inventory","Review low stock","Create order sheets","Receive deliveries","Save documents","Review reports"],
        bodies:["Import from Excel/CSV, then add photos and barcodes.","Count shelves and update current stock.","Check products that are running low.","Create by supplier.","Register arrived items into stock.","Save delivery notes, receipts, and invoices.","Review material cost ratio and trends."]
      },
      plan:{
        eyebrow:"Plan",
        title:"The first release starts free",
        body:"B-tory starts with a free version. The first release focuses on inventory, orders, receiving, documents, and reports. Pro and Max features may be considered in future updates.",
        nowTitle:"Available in the free version",
        now:["Product registration","Photo storage","Barcode / QR scanning","Supplier-based organization","Order sheet creation","Excel order sheet template","Email / LINE / WhatsApp message drafts","Waiting and receiving registration","Document storage","Reports","JSON backup"],
        noTitle:"Not included in the free version",
        no:["Automatic sending","Automatic PDF attachment","Automatic input from photos","Automatic sync with external services","Automatic sync between devices"],
        note:"* Pro and Max features may be considered in future updates. They are not implemented at this time."
      },
      privacy:{
        title:"Data is saved on your device",
        body:"The first Free Starter release is planned to be local-first, with data primarily saved on your device and login optional at first. Future paid plans may add account features, cloud backup, multi-device sync, and team sharing."
      },
      faq:{
        title:"Frequently asked questions",
        questions:["Is B-tory free to use?","Which devices will B-tory support?","Can I use it on a computer?","Can data sync between iPhone and a computer?","When will the Mac and Windows versions be available?","Can I download it outside the Apple Store?","Do I need to log in?","Where is my data saved?","What happens when I change devices?","Are orders sent automatically?","Can LINE or WhatsApp send automatically?","Can I save photos and documents?","Does it automatically connect to POS or booking sites?","Is there a Pro plan?","Can I register from Excel or Numbers inventory sheets?","Do I need to enter all product details first?","Can I use it even if I am not good with computers?","Where can I contact support?"],
        answers:[
          "Yes. The first release is a free version, and core functions such as inventory, ordering, receiving, and document management are available for free.",
          "B-tory is planned as iPhone, iPad, Mac, and Windows apps. The iOS/iPadOS version is being prepared first, and Mac/Windows desktop app versions are planned to follow.",
          "Yes. Mac and Windows desktop app versions are planned. Availability will be announced on the official website.",
          "The first release is planned around local device storage. Future account features, cloud backup, and multi-device sync are also under consideration. If offered, stored information and purposes of use will be clearly explained.",
          "They are currently in preparation. Release timing will be announced on the official website once decided.",
          "The iPhone, iPad, and Mac versions are planned for the Apple Store. Windows distribution through the Microsoft Store or official website is under consideration. If an Android version is added in the future, it will be announced at that time.",
          "The first free release is planned to work without login. Future account registration, Apple login, Google login, email registration, and Pro features are also under consideration.",
          "The first release is planned around local device storage. If cloud backup or multi-device sync is offered in the future, stored information and purposes of use will be clearly explained.",
          "The first release is planned around local device storage. Before changing devices, export a JSON backup and import it on the new device. Cloud backup and multi-device sync are under consideration for the future.",
          "No. B-tory helps create order sheets and message text. You review the contents and send them yourself.",
          "No automatic sending is performed. B-tory helps create the sharing screen or message text, and the actual send action is done by you.",
          "Yes. You can save product photos and documents such as delivery notes, receipts, and invoices on your device.",
          "The free version does not provide automatic integrations or automatic sync.",
          "The first release is a free version. Pro and Max features may be considered in future updates and are not implemented at this time.",
          "Yes. Product data is planned to be importable from CSV or Excel files. If you use Numbers, export the sheet as Excel or CSV first. You can register product names, categories, suppliers, and stock counts together, then add photos and barcodes later.",
          "No. You can start with just product names and stock counts. Categories, makers, suppliers, photos, and barcodes can be added later as needed.",
          "Yes. Start by importing from Excel/CSV, then manage day-to-day work on your phone with photos and barcodes. B-tory is designed so you can organize things gradually around the salon workflow.",
          'Please contact <a href="mailto:salon@thegoodthings-inc.com">salon@thegoodthings-inc.com</a>. You can also visit the <a href="support.html#contact">support contact page</a>.'
        ]
      },
      cta:{
        title:"Reduce inventory worries,<br>focus on the guest in front of you.",
        body:"B-tory is planned as an iPhone, iPad, Mac, and Windows app.",
        button:"Support and contact"
      },
      footer:{
        lead:"A local-first app that keeps beauty salon inventory, orders, receiving, and document management clear by supplier.",
        contact:'Operator: The good things K.K.<br>Representative: Daisuke Michishita, CEO / Representative Director<br>Address: Kuwano Bldg. 2F, 6-23-4 Jingumae, Shibuya-ku, Tokyo 150-0001, Japan<br>Contact: <a href="mailto:salon@thegoodthings-inc.com">salon@thegoodthings-inc.com</a> / <a href="tel:+81368244380">+81-3-6824-4380</a>',
        headings:["Product","Support & terms"],
        productLinks:["Features","How it works","Free version","FAQ"],
        supportLinks:["Support","Privacy Policy","Terms of Use","Contact"],
        bottom:"Beauty inventory and ordering."
      }
    },
    ja:{
      meta:{
        lang:"ja",
        title:"B-tory｜美容サロンの在庫・発注・納品・書類管理アプリ",
        description:"B-toryは、美容サロンの在庫・発注・納品・書類管理を仕入先別に整理できるローカル保存型アプリ。写真とバーコードで管理し、発注書の作成から納品・書類保存・レポートまでひとつにつながります。",
        ogTitle:"B-tory｜美容サロンの在庫・発注・納品・書類管理アプリ",
        ogDescription:"仕入先別の在庫・発注・納品・書類管理をひとつに。写真・バーコード対応のローカル保存型 美容サロン向けアプリ。",
        twitterDescription:"仕入先別の在庫・発注・納品・書類管理をひとつに。ローカル保存型の美容サロン向けアプリ。",
        locale:"ja_JP",
        schemaDescription:"美容サロンの在庫・発注・納品・書類管理を仕入先別に整理できるローカル保存型アプリ。"
      },
      nav:["機能","使い方","プライバシー","サポート"],
      menuLabel:"メニューを開閉",
      headerCta:"ダウンロード予定",
      hero:{
        eyebrow:"現役美容師の声から生まれた、サロン管理アプリ",
        title:heroTitle("今日からスマホが、",["サロンの","在庫管理端末に。"]),
        subhead:"紙やExcelの抜け漏れを減らし、在庫・発注・納品・領収書までその場で一元管理。",
        lead:"B-toryは、写真・バーコードで商品を登録し、仕入先別・メーカー別・カテゴリ別に整理できるサロン向け業務アプリです。要発注の確認、発注書作成、入荷待ち、納品登録、領収書保存まで、サロンワークの流れに合わせて使えます。",
        cta:"Free Starterで試す予定",
        guide:"30日無料トライアルを見る",
        support:"使い方を見る",
        note:"Free Starterから開始予定。Starterは30日無料トライアルも準備中です。iPhone / iPad / Mac / Windows 対応予定。"
      },
      download:{
        eyebrow:"Download",
        title:"ダウンロード",
        body:"B-toryは、サロンの現場でもバックオフィスでも使いやすいように、iPhone・iPad・Mac・Windowsアプリとして展開予定です。",
        titles:["iPhone","iPad","Mac","Windows"],
        bodies:[
          "営業中の在庫チェック、バーコード確認、発注、納品登録、領収書保存をスマホでかんたんに。",
          "タブレットの大きな画面で、商品一覧・発注確認・納品登録を見やすく操作できます。",
          "サロンのバックオフィスで、商品整理・発注書確認・レポート確認を大きな画面で行えるデスクトップアプリ版です。",
          "Windows PCでも使えるデスクトップアプリ版を準備中です。サロンの事務作業や在庫整理に使いやすい環境を目指します。"
        ],
        buttons:["Apple Storeで公開予定","Apple Storeで公開予定","Apple Storeで公開予定","Windows版 準備中"]
      },
      slides:{
        flowLabel:"B-toryの機能紹介",
        controls:"スライド操作",
        dots:["ブランドを表示","Excel取り込みを表示","写真登録を表示","バーコードを表示","要発注を表示","仕入先別発注を表示","納品を表示","書類とレポートを表示"],
        labels:["1 / 8 ブランド","2 / 8 Excel/CSV","3 / 8 写真登録","4 / 8 バーコード","5 / 8 要発注","6 / 8 仕入先別発注","7 / 8 納品","8 / 8 書類とレポート"],
        brand:{kicker:["Salon inventory app","サロン在庫アプリ"],title:"美容サロンの在庫アプリは、B-tory。",body:"現役美容師の声から生まれた、サロン材料管理アプリ。",tags:["在庫","発注","納品","書類管理"]},
        excel:{kicker:["Excel / CSV import","Excel取り込み"],title:"Excelから始めて、スマホで管理。",body:"既存の在庫表から取り込み、写真やバーコードを後から追加できます。"},
        photo:{kicker:["Photo inventory","写真登録"],title:"写真で見つけやすく、登録もかんたん。",body:"カラー剤、店販商品、備品まで。写真で商品を迷わず管理。",screenTitle:"商品登録",fields:["カラークリーム 8N","仕入先: Aディーラー"],stock:"在庫 4",card:["写真で管理","棚で迷わない"]},
        barcode:{kicker:["Barcode check","バーコード確認"],title:"バーコードで、すぐ商品確認。",body:"営業中でも、スキャンして在庫をその場でチェック。",status:"スキャン中",result:["グロスカラー 6P","現在庫 7本"]},
        reorder:{kicker:["Reorder alert","要発注"],title:"足りない商品が、ひと目で分かる。",body:"発注点を下回った商品を見逃しにくく。",head:["要発注","3件"],rows:[["OX 6%","残り 1"],["カラー 8N","残り 2"],["手袋 M","残り 1"]],badge:"発注点以下"},
        dealer:{kicker:["Dealer ordering","仕入先別発注"],title:"仕入先ごとに、注文書まで一気に。",body:"ディーラー別にまとめて、発注書や発注本文を作成。",suppliers:[["Aディーラー","5品目"],["Bディーラー","2品目"]],channels:["Excel","メール","LINE","WhatsApp"],note:"送信前に確認"},
        delivery:{kicker:["Delivery flow","納品管理"],title:"届いたら、納品登録で在庫に反映。",body:"入荷待ち、一部納品、納品済みまで流れで管理。",statuses:["入荷待ち","一部納品","納品済み"],stock:["在庫","2 → 8"]},
        docs:{kicker:["Documents & report","書類・レポート"],title:"領収書も、材料費率も、あとから見える。",body:"納品書・請求書・領収書を保存。材料費率や使用傾向も確認。",docs:["納品書","請求書","領収書"],report:"材料費率",trend:"薬剤使用傾向"}
      },
      problems:{
        eyebrow:"Simplify",
        title:"面倒なサロン管理を、B-toryでシンプルに。",
        body:"在庫が分からない、発注がバラバラ、材料費が見えない。B-toryは、サロンの材料管理を「見える・まとまる・残せる」流れに変えます。",
        before:["Before: 在庫状況が見えない","Before: 発注がバラバラ","Before: 届いたか確認しづらい","Before: 書類が探せない","Before: 材料費が見えない","Before: 管理が続かない"],
        arrow:"B-toryで",
        titles:["在庫数と要発注を見える化","仕入先ごとに、まとめて発注","入荷待ちから納品まで、流れで管理","納品書・領収書・請求書を保存","材料費率と使用傾向を確認","スマホで、かんたんに続けられる"],
        bodies:["棚卸や数量調整を反映し、今ある数と足りない商品を一覧で確認できます。","ディーラー別に要発注商品を整理し、発注書や発注本文を作成できます。","発注済みの商品を入荷待ちにし、届いたら納品登録で在庫に反映できます。","書類を写真やPDFで保存し、発注番号・仕入先・商品名であとから探せます。","在庫や使用データから、材料費率や薬剤使用の傾向を見える化できます。","パソコンがなくても使いやすく、一人サロン・小規模サロンでも始めやすい設計です。"]
      },
      features:{
        eyebrow:"Features",
        title:"B-toryでできること",
        body:"営業中に迷わず使える機能を、サロンの材料管理の流れにあわせて。",
        titles:["写真とバーコードで在庫管理","仕入先・メーカー・カテゴリ別に整理","要発注を見逃さない","発注書・発注本文を作成","入荷待ちと納品登録","納品書・領収書・請求書を保存","材料費率と使用傾向を確認","JSONバックアップで保存"],
        bodies:["Excel/CSVから取り込み、写真・バーコードでも登録。","サロンに合わせた分類で商品を探しやすく。","少なくなった商品をひと目で把握。","標準・Excel・メール・LINE・WhatsApp など。","一部納品・全数納品に対応し在庫へ反映。","書類をまとめて保存し、後から検索。","材料費率や使用傾向をレポートで把握。","データを書き出して安全に保管・復元。"]
      },
      difference:{
        eyebrow:"B-toryが選ばれる理由",
        title:"サロンの在庫管理業務を効率化。",
        body:"紙・Excel・メモで散らばりやすいサロン材料管理を、現場で使いやすい流れに変えます。",
        titles:["現場にすぐ馴染む、サロン専用設計","Excelから始めて、スマホで管理","発注・納品の抜け漏れを減らせる","領収書・納品書まであとから探せる"],
        bodies:["現役美容師の声から生まれた、サロン材料管理アプリです。カラー剤、店販商品、備品、領収書まで、サロンワークに合わせて迷わず使える設計を目指しています。","Excel/CSVや既存の在庫表から商品を取り込み、写真・バーコードでも登録・確認できます。カラー剤、店販商品、備品まで、営業中でもその場で在庫を見つけやすくします。","要発注の確認、発注書作成、入荷待ち、納品登録までを一連で管理。紙やExcelで起きやすい発注漏れ・確認漏れを減らします。","領収書、納品書、請求書を写真やPDFで保存。発注番号、仕入先、商品名であとから探せるので、材料管理や確認作業がスムーズになります。"],
        visualLabels:["在庫","要発注","入荷待ち","領収書","Excel / CSV","商品登録","写真","バーコード","在庫 7","要発注","発注書","入荷待ち","納品","在庫 2→8","領収書","納品書","請求書","検索","材料費率"]
      },
      workflow:{
        eyebrow:"How it works",
        title:"基本の流れ",
        body:"商品登録から発注、納品、書類保存まで。B-toryはサロンワークの流れに合わせて使えます。",
        titles:["商品を登録","在庫をチェック","要発注を確認","発注書を作成","納品登録","書類を保存","レポートで振り返り"],
        bodies:["Excel/CSVから取り込み、写真・バーコードでも登録。","棚卸して今ある数を反映。","少ない商品を確認。","仕入先ごとにまとめて作成。","届いた商品を登録して在庫へ。","納品書・領収書・請求書を保存。","材料費率や傾向を確認。"]
      },
      plan:{
        eyebrow:"Plan",
        title:"初回リリースは無料版から",
        body:"B-toryは、まず無料版としてスタートします。初回リリースでは、在庫・発注・納品・書類管理を中心に提供します。Pro／Max機能は今後のアップデートで検討予定です。",
        nowTitle:"無料版でできること",
        now:["商品登録","写真保存","バーコード／QR読み取り","仕入先別整理","発注書作成","Excelテンプレート発注書","メール／LINE／WhatsApp本文作成","入荷待ち・納品登録","書類保存","レポート","JSONバックアップ"],
        noTitle:"無料版で行わないこと",
        no:["自動送信","自動PDF添付","写真からの自動入力","外部サービスとの自動同期","端末間の自動同期"],
        note:"※ Pro／Max機能は今後のアップデートで検討予定です。現時点では実装されていません。"
      },
      privacy:{
        title:"データは端末内に保存",
        body:"B-tory Freeはローカル保存型です。データは基本的に端末内に保存され、アカウント作成やログインは不要です。機種変更や端末故障に備えて、定期的にJSONバックアップを保存してください。"
      },
      faq:{
        title:"よくある質問",
        questions:["B-toryは無料で使えますか？","B-toryはどの端末で使えますか？","PCでも使えますか？","iPhoneとPCでデータは同期できますか？","Mac版やWindows版はいつ使えますか？","Apple Store以外からダウンロードできますか？","ログインは必要ですか？","データはどこに保存されますか？","機種変更するとデータはどうなりますか？","発注は自動送信されますか？","LINEやWhatsAppで自動送信できますか？","写真や書類は保存できますか？","POSや予約サイトと自動連携しますか？","Proプランはありますか？","サポートはどこから連絡できますか？"],
        answers:["はい。初回リリースは無料版で、在庫・発注・納品・書類管理などの主要機能を無料でご利用いただけます。","B-toryは、iPhone・iPad・Mac・Windowsアプリとして展開予定です。まずはiOS/iPadOS版を中心に準備し、Mac/Windowsのデスクトップアプリ版も順次対応予定です。","はい。Mac/Windows向けのデスクトップアプリ版を準備予定です。公開までは公式サイトで案内します。","初回リリースでは端末内保存を中心に開始予定です。将来のアカウント機能・クラウドバックアップ・複数端末同期についても検討しています。提供する場合は、保存される情報や利用目的を明示します。","現在準備中です。公開時期が決まり次第、公式サイトでお知らせします。","iPhone/iPad/Mac版はApple Storeでの公開を予定しています。Windows版はMicrosoft Storeまたは公式サイトでの配布を検討しています。Android版を提供する場合は、その時点で案内を追加します。","初回リリースの無料版は、ログインなしでも使い始められます。将来のアカウント登録、Appleログイン、Googleログイン、メール登録、Pro機能についても検討しています。","初回リリースでは端末内保存を中心に開始予定です。将来、クラウドバックアップや複数端末同期を提供する場合は、保存される情報や利用目的を明示します。","初回リリースでは端末内保存を中心に開始予定です。機種変更の前にJSONバックアップを書き出し、新しい端末で読み込んで復元してください。将来のクラウドバックアップや複数端末同期も検討しています。","いいえ。B-toryは発注書や本文の作成までを支援します。内容を確認のうえ、送信はご自身で行います。","自動送信は行いません。共有画面や本文の作成までを支援し、実際の送信はあなたの操作で行います。","はい。商品写真や、納品書・領収書・請求書などの書類を端末内保存を中心に扱える予定です。","無料版では自動連携・自動同期は行いません。","初回リリースは無料版です。Pro／Max機能は今後のアップデートで検討予定で、現時点では実装されていません。",'<a href="mailto:salon@thegoodthings-inc.com">salon@thegoodthings-inc.com</a> までご連絡ください。<a href="support.html">サポートページ</a>もご覧ください。']
      },
      cta:{title:"在庫の心配を減らして、<br>目の前のお客様に集中する。",body:"B-toryはiPhone / iPad / Mac / Windowsアプリとして公開予定です。",button:"サポート・お問い合わせ"},
      footer:{
        lead:"美容サロンの在庫・発注・納品・書類管理を、仕入先別に分かりやすく整理できるローカル保存型アプリ。",
        contact:'運営者：The good things 株式会社<br><span class="en">The good things K.K.</span><br>代表責任者：代表取締役社長 道下 大輔<br><span class="en">Daisuke Michishita, CEO / Representative Director</span><br>所在地：〒150-0001 東京都渋谷区神宮前六丁目23番4号 桑野ビル2階<br><span class="en">Kuwano Bldg. 2F, 6-23-4 Jingumae, Shibuya-ku, Tokyo 150-0001, Japan</span><br>連絡先：<a href="mailto:salon@thegoodthings-inc.com">salon@thegoodthings-inc.com</a> / <a href="tel:+81368244380">03-6824-4380</a><br><span class="en">+81-3-6824-4380</span>',
        headings:["プロダクト","サポート・規約"],
        productLinks:["機能","使い方","無料版について","FAQ"],
        supportLinks:["サポート","プライバシーポリシー","利用規約","お問い合わせ"],
        bottom:"Beauty inventory and ordering."
      }
    },
    zh:{
      meta:{
        lang:"zh-Hans",
        title:"B-tory | 美容沙龙库存、订货、入库与文件管理应用",
        description:"B-tory 是面向美容沙龙的本地保存型库存管理应用。可用照片和条码管理商品，并按供应商、制造商、分类整理订货、入库、文件和报表。",
        ogTitle:"B-tory | 美容沙龙库存、订货、入库与文件管理应用",
        ogDescription:"把库存、订货、入库、文件和报表放在一个本地保存型应用中。适合美容沙龙使用。",
        twitterDescription:"美容沙龙的库存、订货、入库、文件和报表管理应用。",
        locale:"zh_CN",
        schemaDescription:"面向美容沙龙的本地保存型库存、订货、入库、文件管理和报表应用。"
      },
      nav:["功能","使用方法","隐私","支持"],
      menuLabel:"打开或关闭菜单",
      headerCta:"下载计划",
      hero:{
        eyebrow:"源自现役发型师声音的沙龙管理应用",
        title:heroTitle("从今天起，","让手机成为沙龙库存管理工具。"),
        subhead:"减少纸张和 Excel 的遗漏，把库存、订货、入库和收据放进一个流程。",
        lead:"B-tory 是面向沙龙的业务应用，可用照片和条码登记商品，并按供应商、制造商和分类整理。可确认需订货商品、创建订单、管理等待入库、登记入库并保存收据，贴合沙龙工作流程。",
        cta:"Free Starter 计划提供",
        guide:"查看30天试用",
        support:"查看使用方法",
        note:"计划从 Free Starter 开始。Starter 30天免费试用也在准备中。计划支持 iPhone / iPad / Mac / Windows。"
      },
      download:{
        eyebrow:"Download",
        title:"下载",
        body:"B-tory 计划推出 iPhone、iPad、Mac、Windows 应用，以便在沙龙现场和后台办公中使用。",
        titles:["iPhone","iPad","Mac","Windows"],
        bodies:["营业中可用手机轻松确认库存、扫描条码、创建订货、登记入库和保存收据。","在更大的平板屏幕上，更清楚地操作商品列表、订货确认和入库登记。","面向沙龙后台工作的桌面应用版本，计划用于商品整理、订单确认和报表查看。","Windows 桌面应用版本正在准备中，目标是让沙龙办公和库存整理更容易。"],
        buttons:["Apple Store 即将发布","Apple Store 即将发布","Apple Store 即将发布","Windows 版准备中"]
      },
      slides:{
        flowLabel:"B-tory 功能介绍",
        controls:"幻灯片操作",
        dots:["显示品牌","显示Excel导入","显示照片登记","显示条码","显示需订货","显示供应商订货","显示入库","显示文件和报表"],
        labels:["1 / 8 品牌","2 / 8 Excel/CSV","3 / 8 照片登记","4 / 8 条码","5 / 8 需订货","6 / 8 按供应商订货","7 / 8 入库","8 / 8 文件和报表"],
        brand:{kicker:["Salon inventory app","沙龙库存应用"],title:"美容沙龙的库存应用，B-tory。",body:"源自现役发型师声音的沙龙材料管理应用。",tags:["库存","订货","入库","文件"]},
        excel:{kicker:["Excel / CSV import","Excel导入"],title:"从 Excel 开始，用手机管理。",body:"从现有库存表导入，之后再添加照片和条码。"},
        photo:{kicker:["Photo inventory","照片登记"],title:"用照片更容易找到，登记也简单。",body:"染膏、店售商品、备品，都可以用照片清楚管理。",screenTitle:"商品登记",fields:["染膏 8N","供应商: A 经销商"],stock:"库存 4",card:["照片管理","不用在货架上找"]},
        barcode:{kicker:["Barcode check","条码确认"],title:"用条码快速确认商品。",body:"营业中也能扫描并当场确认库存。",status:"扫描中",result:["Gloss Color 6P","当前库存 7"]},
        reorder:{kicker:["Reorder alert","需订货"],title:"不足的商品一眼可见。",body:"更容易发现低于订货点的商品。",head:["需订货","3 件"],rows:[["OX 6%","剩 1"],["Color 8N","剩 2"],["手套 M","剩 1"]],badge:"低于订货点"},
        dealer:{kicker:["Supplier ordering","按供应商"],title:"按供应商汇总，直到订单文件。",body:"按经销商整理，并创建订单文件或订货正文。",suppliers:[["A 经销商","5 项"],["B 经销商","2 项"]],channels:["Excel","邮件","LINE","WhatsApp"],note:"发送前确认"},
        delivery:{kicker:["Receiving flow","入库管理"],title:"到货后登记入库并反映库存。",body:"从等待入库、部分入库到完成入库，一条流程管理。",statuses:["等待入库","部分入库","已入库"],stock:["库存","2 → 8"]},
        docs:{kicker:["Documents & report","文件・报表"],title:"收据和材料费率之后也能查看。",body:"保存送货单、发票、收据。也可查看材料费率和使用趋势。",docs:["送货单","发票","收据"],report:"材料费率",trend:"药剂使用趋势"}
      },
      problems:{
        eyebrow:"Simplify",
        title:"用 B-tory 让繁琐的沙龙管理更简单。",
        body:"库存不清楚、订货分散、文件找不到。B-tory 把沙龙材料管理变成看得见、能汇总、可保存的流程。",
        before:["Before: 不知道库存在哪里","Before: 订货很分散","Before: 到货难确认","Before: 文件找不到","Before: 材料费看不见","Before: 管理难坚持"],
        arrow:"用 B-tory",
        titles:["库存数量和需订货可视化","按供应商汇总订货","从等待入库到入库完成流程管理","保存送货单、收据、发票","确认材料费率和使用趋势","用手机也能轻松坚持"],
        bodies:["反映盘点和数量调整，更容易在列表中确认当前数量和不足商品。","按经销商整理需订货商品，并创建订单文件或订货正文。","把已订商品设为等待入库，到货后登记并反映到库存。","用照片或 PDF 保存文件，之后可按订单号、供应商或商品名查找。","通过库存和使用数据，让材料费率和药剂使用趋势可视化。","无需电脑也容易使用，适合一人沙龙和小型沙龙开始使用。"]
      },
      features:{
        eyebrow:"Features",
        title:"B-tory 可以做什么",
        body:"贴合沙龙材料管理流程，营业中也不迷路的功能。",
        titles:["用照片和条码管理库存","按供应商、制造商、分类整理","不漏看需订货商品","创建订单文件和订货正文","等待入库和入库登记","保存送货单、收据、发票","确认材料费率和使用趋势","用 JSON 备份保存"],
        bodies:["可从 Excel/CSV 导入，也可用照片、条码和 QR 码登记并确认商品。","按照沙龙自己的分类，更容易找到商品。","一眼掌握变少的商品。","支持标准、Excel、邮件、LINE、WhatsApp 等正文草稿。","支持部分入库和全部入库，并反映到库存。","集中保存文件，之后可以搜索。","用报表掌握材料费率和使用趋势。","导出数据，安全保存并恢复。"]
      },
      difference:{eyebrow:"沙龙选择 B-tory 的理由",title:"让沙龙库存管理更高效。",body:"把容易分散在纸张、Excel 和备忘中的沙龙材料管理，变成现场更容易使用的流程。",titles:["专为沙龙现场设计，立即上手","从 Excel 开始，用手机轻松管理。","减少订货和入库确认遗漏","收据和送货单之后也能查找"],bodies:["源自现役发型师声音的沙龙材料管理应用。从染膏、店售商品、备品到收据，致力于贴合沙龙工作、使用不迷茫。","可从 Excel/CSV 或现有库存表导入商品，也可用照片和条码登记与确认。染膏、店售商品和备品在营业中也更容易找到。","把需订货确认、订单创建、等待入库和入库登记连成一个流程，减少纸张或 Excel 常见的订货漏、确认漏。","用照片或 PDF 保存收据、送货单和发票。之后可按订单号、供应商或商品名查找，让材料管理更顺畅。"],visualLabels:["库存","需订货","待入库","收据","Excel / CSV","商品登记","照片","条码","库存 7","需订货","订单","待入库","入库","库存 2→8","收据","送货单","发票","搜索","材料费率"]},
      workflow:{eyebrow:"How it works",title:"基本流程",body:"从商品登记到订货、入库和文件保存。B-tory 顺着沙龙工作的流程使用。",titles:["登记商品","确认库存","确认需订货","创建订单文件","登记入库","保存文件","查看报表"],bodies:["可从 Excel/CSV 导入，也可添加照片和条码。","盘点货架并更新现有数量。","确认数量较少的商品。","按供应商汇总创建。","把到货商品登记到库存。","保存送货单、收据、发票。","确认材料费率和趋势。"]},
      plan:{eyebrow:"Plan",title:"首次发布从免费版开始",body:"B-tory 首先以免费版开始。首次发布主要提供库存、订货、入库、文件管理和报表。Pro / Max 功能将来可能考虑更新。",nowTitle:"免费版可以使用",now:["商品登记","照片保存","条码 / QR 扫描","按供应商整理","创建订单文件","Excel 订单模板","邮件 / LINE / WhatsApp 正文创建","等待入库・入库登记","文件保存","报表","JSON 备份"],noTitle:"免费版不提供",no:["自动发送","自动附加 PDF","从照片自动输入","与外部服务自动同步","设备之间自动同步"],note:"* Pro / Max 功能将来可能考虑更新，目前尚未实现。"},
      privacy:{title:"首次发布以设备内保存为中心",body:"首次发布的 Free Starter 计划以设备内保存为中心，初期无需登录也可开始使用。未来付费计划可能提供账号、云备份、多设备同步和团队共享功能。"},
      faq:{title:"常见问题",questions:["B-tory 可以免费使用吗？","B-tory 计划支持哪些设备？","可以在电脑上使用吗？","iPhone 和电脑之间可以同步数据吗？","Mac 版和 Windows 版什么时候可以使用？","可以从 Apple Store 以外下载吗？","需要登录吗？","数据保存在哪里？","更换设备时数据怎么办？","订货会自动发送吗？","LINE 或 WhatsApp 可以自动发送吗？","可以保存照片和文件吗？","会自动连接 POS 或预约网站吗？","有 Pro 计划吗？","从哪里联系支持？"],answers:["计划提供名为 Free Starter 的免费体验版。但 Free Starter 是体验版，商品登记数、照片数、文件保存数和订单创建数有限制。日常的库存、订货和收据管理建议使用 Starter。","B-tory 计划作为 iPhone、iPad、Mac、Windows 应用展开。首先以 iOS/iPadOS 版为中心准备，Mac/Windows 桌面应用版也计划陆续支持。","可以。Mac/Windows 桌面应用版正在计划中，公开前会在官方网站通知。","首次发布计划以设备内保存为中心。未来也在考虑账号功能、云备份和多设备同步。提供这些功能时，将明确说明保存的信息和使用目的。","目前正在准备中。发布时间确定后会在官方网站通知。","iPhone/iPad/Mac 版计划在 Apple Store 发布。Windows 版正在考虑 Microsoft Store 或官方网站分发。未来如果提供 Android 版，将在确定后追加说明。","首次发布的免费版计划无需登录即可开始使用。未来也在考虑账号注册、Apple 登录、Google 登录、邮箱注册和 Pro 功能。","首次发布计划以设备内保存为中心。未来提供云备份或多设备同步时，将明确说明保存的信息和使用目的。","首次发布计划以设备内保存为中心。更换设备前，请导出 JSON 备份并在新设备中导入恢复。未来也在考虑云备份和多设备同步。","不会。B-tory 支持创建订单文件和正文。请确认内容后由您自己发送。","不会自动发送。B-tory 只支持创建分享画面或正文，实际发送由您操作。","可以。商品照片、送货单、收据、发票等文件在首次发布中以设备内保存为中心。","免费版不提供自动连接或自动同步。","首次发布为免费版。Pro / Max 功能将来可能考虑更新，目前尚未实现。",'请联系 <a href="mailto:salon@thegoodthings-inc.com">salon@thegoodthings-inc.com</a>。也可查看 <a href="support.html">支持页面</a>。']},
      cta:{title:"减少库存担心，<br>专注眼前的顾客。",body:"B-tory 计划作为 iPhone / iPad / Mac / Windows 应用发布。",button:"支持与联系"},
      footer:{lead:"面向美容沙龙的本地保存型应用，可按供应商清楚整理库存、订货、入库和文件管理。",contact:'Operator: The good things K.K.<br>Representative: Daisuke Michishita, CEO / Representative Director<br>Address: Kuwano Bldg. 2F, 6-23-4 Jingumae, Shibuya-ku, Tokyo 150-0001, Japan<br>Contact: <a href="mailto:salon@thegoodthings-inc.com">salon@thegoodthings-inc.com</a> / <a href="tel:+81368244380">+81-3-6824-4380</a>',headings:["产品","支持与条款"],productLinks:["功能","使用方法","免费版","FAQ"],supportLinks:["支持","隐私政策","使用条款","联系"],bottom:"Beauty inventory and ordering."}
    },
    es:{
      meta:{
        lang:"es",
        title:"B-tory | App para inventario, pedidos, recepción y documentos de salón",
        description:"B-tory es una app local-first para salones de belleza. Gestiona inventario, pedidos, recepción, documentos y reportes por proveedor, fabricante y categoría con fotos y códigos de barras.",
        ogTitle:"B-tory | App para inventario, pedidos, recepción y documentos de salón",
        ogDescription:"Inventario, pedidos, recepción, documentos y reportes en una app local-first para salones de belleza.",
        twitterDescription:"Inventario, pedidos, recepción, documentos y reportes para salones de belleza.",
        locale:"es_ES",
        schemaDescription:"App local-first para inventario, pedidos, recepción, gestión de documentos y reportes en salones de belleza."
      },
      nav:["Funciones","Cómo funciona","Privacidad","Soporte"],
      menuLabel:"Abrir o cerrar menú",
      headerCta:"Descargas previstas",
      hero:{
        eyebrow:"Una app de gestión de salón inspirada por estilistas en activo",
        title:heroTitle("Convierte tu móvil",["en una herramienta de\u00a0","inventario para tu salón."]),
        subhead:"Reduce huecos del papel y Excel. Gestiona inventario, pedidos, recepción y recibos en un solo flujo.",
        lead:"B-tory es una app de trabajo para salones que registra productos con fotos y códigos, y los organiza por proveedor, fabricante y categoría. Revisa bajo stock, crea órdenes, gestiona pendientes, registra recepción y guarda recibos siguiendo el flujo del salón.",
        cta:"Free Starter previsto",
        guide:"Ver prueba de 30 días",
        support:"Ver cómo funciona",
        note:"Previsto iniciar con Free Starter. También se prepara una prueba de 30 días para Starter. Previsto para iPhone / iPad / Mac / Windows."
      },
      download:{
        eyebrow:"Download",
        title:"Descargas",
        body:"B-tory está previsto como app para iPhone, iPad, Mac y Windows, para funcionar tanto en el salón como en el back office.",
        titles:["iPhone","iPad","Mac","Windows"],
        bodies:["Comprueba stock, códigos de barras, pedidos, recepción y recibos fácilmente desde el móvil durante el servicio.","Usa la pantalla grande del tablet para revisar listas de productos, pedidos y recepción con más claridad.","Versión de escritorio prevista para organizar productos, revisar pedidos y ver reportes en una pantalla grande.","Versión de escritorio para Windows en preparación, pensada para tareas administrativas e inventario del salón."],
        buttons:["Próximamente en Apple Store","Próximamente en Apple Store","Próximamente en Apple Store","Versión Windows en preparación"]
      },
      slides:{
        flowLabel:"Presentación de funciones de B-tory",
        controls:"Controles de diapositivas",
        dots:["Mostrar marca","Mostrar importación Excel/CSV","Mostrar registro con fotos","Mostrar código de barras","Mostrar reposición","Mostrar pedidos por proveedor","Mostrar recepción","Mostrar documentos y reportes"],
        labels:["1 / 8 Marca","2 / 8 Excel / CSV","3 / 8 Registro con fotos","4 / 8 Código de barras","5 / 8 Reposición","6 / 8 Pedidos por proveedor","7 / 8 Recepción","8 / 8 Documentos y reportes"],
        brand:{kicker:["Salon inventory app","Para salones"],title:"B-tory es inventario para salones de belleza.",body:"Una app de gestión de materiales creada a partir de estilistas en activo.",tags:["Inventario","Pedidos","Recepción","Documentos"]},
        excel:{kicker:["Excel / CSV import","Desde Excel"],title:"Empieza desde Excel y gestiona desde el móvil.",body:"Importa desde tu lista de inventario existente y añade fotos y códigos después."},
        photo:{kicker:["Photo inventory","Fotos"],title:"Más fácil de encontrar con fotos, más fácil de registrar.",body:"Coloración, productos de venta y suministros. Gestiona visualmente sin dudas.",screenTitle:"Registro de producto",fields:["Color Cream 8N","Proveedor: Dealer A"],stock:"Stock 4",card:["Gestión con fotos","Sin buscar en estantes"]},
        barcode:{kicker:["Barcode check","Código"],title:"Comprueba productos rápido con código de barras.",body:"Escanea durante el servicio y revisa el stock al momento.",status:"Escaneando",result:["Gloss Color 6P","Stock actual 7"]},
        reorder:{kicker:["Reorder alert","Bajo stock"],title:"Ve lo que falta de un vistazo.",body:"Es más fácil no pasar por alto productos por debajo del punto de pedido.",head:["Reposición","3 items"],rows:[["OX 6%","Queda 1"],["Color 8N","Quedan 2"],["Guantes M","Queda 1"]],badge:"Bajo punto de pedido"},
        dealer:{kicker:["Supplier ordering","Por proveedor"],title:"Agrupa por proveedor hasta crear la orden.",body:"Crea órdenes y textos de pedido por dealer.",suppliers:[["Dealer A","5 items"],["Dealer B","2 items"]],channels:["Excel","Email","LINE","WhatsApp"],note:"Revisar antes de enviar"},
        delivery:{kicker:["Receiving flow","Recepción"],title:"Cuando llega, regístralo y actualiza el stock.",body:"Gestiona pendiente, recepción parcial y recibido en un flujo.",statuses:["Pendiente","Parcial","Recibido"],stock:["Stock","2 → 8"]},
        docs:{kicker:["Documents & report","Reportes"],title:"Recibos y coste de materiales visibles después.",body:"Guarda albaranes, facturas y recibos. Revisa ratio de coste y tendencias de uso.",docs:["Albarán","Factura","Recibo"],report:"Coste material",trend:"Tendencia de uso"}
      },
      problems:{
        eyebrow:"Simplify",
        title:"Haz más simple la gestión del salón con B-tory.",
        body:"Inventario difícil de ver, pedidos dispersos y documentos perdidos. B-tory convierte la gestión de materiales en un flujo visible, agrupado y guardado.",
        before:["Before: No se ve el stock","Before: Pedidos dispersos","Before: Difícil saber si llegó","Before: Documentos perdidos","Before: Costes poco visibles","Before: Cuesta mantenerlo"],
        arrow:"Con B-tory",
        titles:["Visualiza stock y necesidades de pedido","Agrupa pedidos por proveedor","Gestiona de pendiente a recibido","Guarda albaranes, recibos y facturas","Revisa coste de materiales y tendencias","Sigue fácil desde el móvil"],
        bodies:["Refleja conteos y ajustes para revisar cantidades actuales y productos bajos en una lista.","Organiza los productos a pedir por dealer y crea órdenes o textos de pedido.","Pasa productos pedidos a pendiente y, cuando llegan, regístralos en stock.","Guarda documentos como foto o PDF y búscalos por número de pedido, proveedor o producto.","Visualiza ratio de coste de materiales y tendencias de uso desde los datos.","Diseñada para usar sin ordenador, también en salones pequeños o de una sola persona."]
      },
      features:{
        eyebrow:"Features",
        title:"Qué puede hacer B-tory",
        body:"Funciones pensadas para el flujo de materiales del salón y fáciles de usar durante el servicio.",
        titles:["Inventario con fotos y códigos","Organiza por proveedor, fabricante y categoría","No pierdas productos con bajo stock","Crea órdenes y textos de pedido","Pendientes y recepción","Guarda albaranes, recibos y facturas","Revisa coste y tendencias de uso","Guarda con backup JSON"],
        bodies:["Importa desde Excel/CSV o registra y comprueba productos con fotos, códigos de barras y QR.","Encuentra productos con clasificaciones adaptadas a tu salón.","Ve de un vistazo los productos que bajan de stock.","Borradores para estándar, Excel, email, LINE, WhatsApp y más.","Maneja recepción parcial o completa y actualiza stock.","Guarda documentos juntos y búscalos después.","Comprende coste de materiales y tendencias en reportes.","Exporta datos para guardarlos y restaurarlos con más seguridad."]
      },
      difference:{eyebrow:"Por qué los salones eligen B-tory",title:"Haz más eficiente la gestión de inventario del salón.",body:"Convierte la gestión de materiales dispersa en papel, Excel y notas en un flujo fácil de usar en el salón.",titles:["Diseñado para el trabajo real del salón","Empieza desde Excel y gestiona fácilmente desde el móvil.","Reduce pedidos omitidos y revisiones de recepción","Recibos y albaranes fáciles de buscar"],bodies:["Una app de materiales para salones creada a partir de estilistas en activo. Desde coloración y productos de venta hasta suministros y recibos, pensada para usarse sin dudas en el flujo del salón.","Importa productos desde Excel/CSV o listas de inventario existentes, y registra o revisa artículos con fotos y códigos de barras. Coloración, venta y suministros son más fáciles de encontrar durante el servicio.","Gestiona bajo stock, órdenes, pendientes y recepción como un solo flujo. Reduce olvidos de pedido y revisión que ocurren con papel o Excel.","Guarda recibos, albaranes y facturas como foto o PDF. Busca después por número de pedido, proveedor o producto para trabajar con más fluidez."],visualLabels:["Stock","Reposición","Pendiente","Recibo","Excel / CSV","Producto","Foto","Código","Stock 7","Reposición","Orden","Pendiente","Recepción","Stock 2→8","Recibo","Albarán","Factura","Buscar","Coste mat."]},
      workflow:{eyebrow:"How it works",title:"Flujo básico",body:"Del registro de productos a pedidos, recepción y documentos. B-tory sigue el flujo real del salón.",titles:["Registra productos","Comprueba stock","Revisa bajo stock","Crea órdenes","Registra recepción","Guarda documentos","Revisa reportes"],bodies:["Importa desde Excel/CSV y añade fotos y códigos de barras.","Cuenta estantes y actualiza cantidades.","Comprueba productos que bajan.","Crea agrupado por proveedor.","Registra lo recibido en stock.","Guarda albaranes, recibos y facturas.","Revisa costes y tendencias."]},
      plan:{eyebrow:"Plan",title:"El primer lanzamiento empieza gratis",body:"B-tory comenzará con una versión gratuita. El primer lanzamiento se centra en inventario, pedidos, recepción, documentos y reportes. Funciones Pro / Max se considerarán en futuras actualizaciones.",nowTitle:"Disponible en la versión gratuita",now:["Registro de productos","Guardado de fotos","Lectura de códigos / QR","Organización por proveedor","Creación de orden","Plantilla Excel de pedido","Texto para email / LINE / WhatsApp","Pendientes y recepción","Guardado de documentos","Reportes","Backup JSON"],noTitle:"No incluido en la versión gratuita",no:["Envío automático","Adjunto PDF automático","Entrada automática desde fotos","Sincronización automática con servicios externos","Sincronización automática entre dispositivos"],note:"* Funciones Pro / Max se considerarán en futuras actualizaciones. Actualmente no están implementadas."},
      privacy:{title:"El primer lanzamiento se centra en almacenamiento local",body:"Free Starter está previsto como local-first, con datos principalmente guardados en el dispositivo y sin necesidad inicial de iniciar sesión. Los planes de pago futuros pueden añadir cuenta, backup en la nube, sincronización y uso compartido en equipo."},
      faq:{title:"Preguntas frecuentes",questions:["¿B-tory es gratis?","¿Qué dispositivos está previsto que soporte B-tory?","¿Puedo usarlo en una computadora?","¿Se pueden sincronizar datos entre iPhone y computadora?","¿Cuándo estarán disponibles las versiones Mac y Windows?","¿Se podrá descargar fuera de Apple Store?","¿Necesito iniciar sesión?","¿Dónde se guardan mis datos?","¿Qué pasa al cambiar de dispositivo?","¿Los pedidos se envían automáticamente?","¿LINE o WhatsApp envían automáticamente?","¿Puedo guardar fotos y documentos?","¿Se conecta automáticamente con POS o reservas?","¿Hay plan Pro?","¿Dónde contacto soporte?"],answers:["Se prevé ofrecer Free Starter como versión gratuita de prueba. Pero Free Starter es un plan de prueba con límites en productos, fotos, documentos y órdenes. Para el inventario, pedidos y recibos del día a día, recomendamos Starter.","B-tory está previsto como app para iPhone, iPad, Mac y Windows. Primero se prepara la versión iOS/iPadOS, y las versiones de escritorio para Mac/Windows están previstas después.","Sí. Se preparan versiones de escritorio para Mac y Windows. La disponibilidad se anunciará en el sitio oficial.","El primer lanzamiento está previsto con almacenamiento local en el dispositivo. También se consideran funciones futuras de cuenta, backup en la nube y sincronización entre dispositivos. Si se ofrecen, se explicarán la información guardada y los fines de uso.","Actualmente están en preparación. La fecha se anunciará en el sitio oficial cuando esté definida.","Las versiones para iPhone, iPad y Mac están previstas para Apple Store. Para Windows se considera Microsoft Store o distribución desde el sitio oficial. Si se añade una versión Android en el futuro, se anunciará entonces.","La primera versión gratuita está prevista para poder empezar sin iniciar sesión. También se consideran registro de cuenta, Apple login, Google login, email y funciones Pro en el futuro.","El primer lanzamiento está previsto con almacenamiento local. Si se ofrece backup en la nube o sincronización entre dispositivos, se explicarán la información guardada y los fines de uso.","El primer lanzamiento está previsto con almacenamiento local. Antes de cambiar de dispositivo, exporta un backup JSON e impórtalo en el nuevo dispositivo. Backup en la nube y sincronización futura están en consideración.","No. B-tory ayuda a crear órdenes y textos. Tú revisas el contenido y lo envías.","No se realiza envío automático. B-tory ayuda a crear la pantalla o el texto para compartir, y el envío real lo haces tú.","Sí. En el primer lanzamiento, las fotos de productos y documentos se gestionan principalmente con almacenamiento local.","La versión gratuita no ofrece integraciones automáticas ni sincronización automática.","El primer lanzamiento es gratuito. Funciones Pro / Max se considerarán en futuras actualizaciones y no están implementadas actualmente.",'Contacta a <a href="mailto:salon@thegoodthings-inc.com">salon@thegoodthings-inc.com</a>. También puedes visitar la <a href="support.html">página de soporte</a>.']},
      cta:{title:"Reduce la preocupación por el stock,<br>concéntrate en el cliente frente a ti.",body:"B-tory está previsto como app para iPhone / iPad / Mac / Windows.",button:"Soporte y contacto"},
      footer:{lead:"Una app local-first que organiza inventario, pedidos, recepción y documentos de salones de belleza de forma clara por proveedor.",contact:'Operator: The good things K.K.<br>Representative: Daisuke Michishita, CEO / Representative Director<br>Address: Kuwano Bldg. 2F, 6-23-4 Jingumae, Shibuya-ku, Tokyo 150-0001, Japan<br>Contact: <a href="mailto:salon@thegoodthings-inc.com">salon@thegoodthings-inc.com</a> / <a href="tel:+81368244380">+81-3-6824-4380</a>',headings:["Producto","Soporte y términos"],productLinks:["Funciones","Cómo funciona","Versión gratuita","FAQ"],supportLinks:["Soporte","Política de privacidad","Términos de uso","Contacto"],bottom:"Beauty inventory and ordering."}
    }
  };

  function merge(target,source){
    Object.keys(source).forEach(function(key){
      if(source[key]&&typeof source[key]==="object"&&!Array.isArray(source[key])){
        target[key]=target[key]||{};
        merge(target[key],source[key]);
      }else{
        target[key]=source[key];
      }
    });
  }

  var BUSINESS_COPY={
    en:{
      meta:{title:"B-tory | BtoB salon inventory, ordering, receiving, and receipt management app",description:"B-tory is a BtoB salon management app planned to start with Free Starter, then Starter, Pro, and Max plans. Manage materials, retail products, orders, receiving, receipts, and invoices with photos and barcodes.",ogTitle:"B-tory | BtoB salon inventory and ordering app",ogDescription:"A salon management app planned for Free Starter, Starter, Pro, and Max. Inventory, orders, receiving, receipts, and reports in one flow.",twitterDescription:"BtoB salon management for inventory, orders, receiving, receipts, and reports.",schemaDescription:"A BtoB beauty salon management app for inventory, ordering, receiving, receipts, documents, and reports."},
      nav:["Features","Plans","FAQ","Privacy","Support"],
      headerCta:"View plans",
      hero:{eyebrow:"A salon management app inspired by real stylists.",title:heroTitle("Turn your phone into","a salon inventory tool."),subhead:"Reduce gaps from paper and spreadsheets. Manage inventory, orders, deliveries, and receipts in one workflow.",lead:"B-tory is a salon business app that can start from Excel/CSV or existing inventory lists, then add photos and barcodes. Organize products by supplier, maker, and category, review low-stock items, create order sheets, track waiting items, register receiving, and keep receipts in the flow of salon work.",cta:"Free Starter planned",guide:"View 30-day trial",support:"See how it works",note:"Planned to start with Free Starter. A 30-day Starter trial is also in preparation. Planned for iPhone / iPad / Mac / Windows."},
      problems:{eyebrow:"Problems",title:"Move from paper, Excel, and notes to a salon-specific flow.",body:"Stock is hard to see, orders get scattered, and costs are unclear. B-tory turns salon materials management into a flow you can see, group, and keep.",before:["Before: Stock status is unclear","Before: Orders are scattered","Before: Deliveries are hard to track","Before: Receipts go missing","Before: Costs are hard to see","Before: Management does not stick"],arrow:"With B-tory",titles:["See inventory and reorder status","Organize by supplier, maker, and category","Manage waiting to receiving","Save receipts, delivery notes, and invoices","Check material cost and usage trends","Keep it simple on phone and PC"],bodies:["Reflect stock counts and adjustments so current quantities and low-stock items are easier to review in one list.","Organize products in the view that fits your salon, from dealer orders to maker management.","Track ordered items as waiting, then register arrivals into inventory.","Save documents as photos or PDFs and find them later by order number, supplier, or product name.","Use inventory and usage data to understand material cost ratio and product trends.","Built to stay easy for solo and small salons, both on the floor and in the back office."]},
      features:{eyebrow:"What B-tory can do",title:"From stock checks to orders, deliveries, and receipt management.",body:"Beyond daily counts, B-tory brings together the features salons need for materials management — product registration, order sheets, receiving, receipt storage, and material cost ratio.",points:["01","02","03","04","05","06","07","08"],titles:["Easy data registration","Stock management","Organize by supplier and maker","Low-stock review","Create order sheets and messages","Waiting and receiving","Save receipts, notes, and invoices","Material cost and usage trends"],bodies:["Import products from Excel/CSV or an existing inventory list, and register with photos and barcodes. You can start with just product names and stock counts.","Check and update stock for color products, retail items, and supplies. Find what you have on hand quickly, even during salon hours.","Organize products by supplier, maker, and category in the view that fits your salon.","Review products below the reorder point so you don't miss low materials or retail items.","Create a B-tory order sheet, Excel template, or email/LINE/WhatsApp message. Sending is done by the user after review.","Set ordered items as waiting, then register receiving to reflect stock when they arrive. Partial receiving is planned.","Save inventory-related documents as photos or PDFs and find them later by order number, supplier, or product name.","Review material cost ratio and product usage trends to help reconsider salon operations."]},
      workflow:{eyebrow:"How it works",title:"B-tory basic flow",body:"From product registration to ordering, receiving, and receipt storage. B-tory follows the real salon workflow.",titles:["Register products","Check inventory","Review low stock","Create order sheets","Receive deliveries","Save receipts","Review reports"],bodies:["Import from Excel/CSV, then add photos and barcodes.","Check quantities during salon hours.","Make low-stock items easier to catch.","Create order sheets or text by supplier.","Register arrived items into inventory.","Save receipts, delivery notes, and invoices as photos or PDFs.","Check material cost ratio and usage trends."]},
      plan:{eyebrow:"Pricing",title:"Plans for different salon sizes",body:"Start small with Free Starter, then move to Starter for real operation. Pro is planned for teams and multi-device use, and Max for integrations and automation."},
      pricing:{labels:["Free Starter","Starter","Pro","Max"],prices:["¥0","¥1,980 / month","¥4,980 / month planned","¥9,800 / month~ planned"],subs:["","¥19,800/year planned","¥49,800/year planned",""],titles:["For salons that want to try first","For solo and small salons running seriously","For teams and multiple devices","For multi-store, integrations, and automation"],descriptions:["An entry plan to try B-tory's core workflow on a small scale. For real inventory, ordering, and receipt management, we recommend Starter.","For salons that want to use daily stock checks, ordering, receiving, and receipt management properly. B-tory's core plan.","For salons that want multiple staff, multiple devices, and cloud backup.","For salons considering multiple stores, external integrations, AI/OCR, and advanced operation."],features:[["Up to 50 products","Up to 30 photos","Up to 10 documents","Up to 100MB document storage","Up to 5 suppliers","1 staff / 1 device","Up to 5 order sheets per month","2 Excel order templates per month","Simple material cost display only","Manual JSON backup only","No cloud sync","No multi-device sync","No staff sharing"],["Up to 300 products","Up to 300 photos","Up to 1GB documents","Up to 30 suppliers","1 user account (sync up to 2 devices)","Relaxed order sheet limits","Relaxed Excel order template limits","Supplier / maker / category organization","Receipt / delivery note / invoice management","Material cost report","Cloud backup (automatic)","JSON backup","iPhone / iPad / Mac / Windows planned"],["All Starter features","Up to 1000 products","Up to 1000 photos","Up to 5GB documents","Up to 100 suppliers","Up to 5 staff","B-tory account","Cloud backup","Multi-device & multi-account sync","Staff invite & permission management","Operation history","Advanced analysis","More document capacity","More photo capacity"],["All Pro features","Large capacity / on request","Large photo capacity / on request","50GB+ document storage","10+ staff","Multi-store support","POS / booking site integrations","Accounting integration","AI/OCR","LINE official integration","WhatsApp Business","Dedicated support"]],buttons:["Free Starter planned","Starter in preparation","Pro in preparation","Max in preparation"],starterNote:"To invite staff and use the same data with multiple people, we recommend the Pro plan.",notes:["* Prices, functions, and free trials are planned. The first release is planned to start with Free Starter.","* Starter trial, paid plans, accounts, cloud backup, multi-device sync, AI/OCR, and external integrations are under consideration for future updates."]},
      trial:{eyebrow:"30-day Starter trial",title:"Not sure? Try Starter for 30 days.",body:"Product registration, photo storage, order sheets, receiving, and receipt management. We're preparing a way to try the full-operation Starter plan in real salon work.",button:"30-day trial in preparation",note:"When officially offered, pricing, period, and renewal terms will be shown clearly."},
      download:{eyebrow:"Apps",title:"Planned apps",body:"B-tory is planned as iPhone, iPad, Mac, and Windows apps.",bodies:["Planned for Apple Store. Check inventory and save receipts from your phone during salon hours.","Planned for Apple Store. Use the larger tablet screen for product organization and order review.","Mac version in preparation. Use it in the salon back office for product organization and report checks.","Windows version in preparation. Planned for PC office work and inventory organization."],buttons:["Apple Store planned","Apple Store planned","Mac version in preparation","Windows version in preparation"]},
      faq:{title:"Frequently asked questions",questions:["Is B-tory free to use?","Can I run my salon with only Free Starter?","Can I try Starter for free?","How much is Starter?","Are Pro and Max planned?","Will I be charged automatically after the trial?","Which devices will B-tory support?","Can I use it on a computer?","Can data sync between iPhone and a computer?","Do I need an account?","Can I register from Excel or Numbers inventory sheets?","Do I need to enter all product details first?","Can I use it even if I am not good with computers?","Are orders sent automatically?","Does it automatically connect to POS or booking sites?","How many items can I register on Free Starter?","How many can Starter manage?","Which plan fits a small salon?","What does Pro add?"],answers:["Free Starter is planned as a free way to try B-tory. However, Free Starter is an entry plan with limits on products, photos, document storage, and order sheets. For daily inventory, ordering, and receipt management, we recommend Starter.","Free Starter is a plan to try B-tory's core workflow on a small scale. Because of limits on counts and storage, we recommend Starter for full salon operation.","Starter is in preparation with a 30-day free trial. It is planned so salons can try product registration, photo storage, order sheet creation, receiving, and receipt management in real work.","Starter is planned at ¥1,980/month or ¥19,800/year. It is intended for solo and small salons. Prices and included features may change before official release.","Pro is planned at ¥4,980/month, and Max from ¥9,800/month. Cloud backup, multi-device sync, staff sharing, integrations, and AI/OCR are under consideration for future updates.","When billing is officially offered, pricing, period, and renewal conditions will be shown clearly before starting. The Starter 30-day trial is currently in preparation.","B-tory is planned as iPhone, iPad, Mac, and Windows apps. The iOS/iPadOS version is being prepared first, with Mac/Windows desktop versions planned to follow.","Yes. Mac and Windows desktop app versions are planned. Availability will be announced on the official website.","The first release is planned around local device storage. Future account features, cloud backup, and multi-device sync are also under consideration. If offered, stored information and purposes of use will be clearly explained.","Free Starter is planned to work without login at first. Future Starter / Pro features may include account registration, Apple login, Google login, email registration, and cloud backup.","Yes. Product data is planned to be importable from CSV or Excel files. If you use Numbers, export the sheet as Excel or CSV first. You can register product names, categories, suppliers, and stock counts together, then add photos and barcodes later.","No. You can start with just product names and stock counts. Categories, makers, suppliers, photos, and barcodes can be added later as needed.","Yes. Start by importing from Excel/CSV, then manage day-to-day work on your phone with photos and barcodes. B-tory is designed so you can organize things gradually around the salon workflow.","No. B-tory creates order sheets and order message text, but the user reviews and sends them.","The first release will not include automatic integrations. External integrations are under consideration for future plans such as Max.","Free Starter is planned to allow up to 50 products, 30 photos, and 10 documents. It's an entry plan to experience the B-tory workflow. For real salon operation, we recommend Starter.","Starter is planned to allow up to 300 products, 300 photos, and 1GB of documents. It's the core plan for one-person and small salons.","To first try the B-tory flow, choose Free Starter; for real daily inventory, ordering, delivery, and receipt management, choose Starter. To share across multiple staff or devices, consider Pro.","Pro is planned to add expanded product counts and document capacity, plus a B-tory account, cloud backup, multi-device sync, staff sharing, operation history, and advanced analysis."]},
      cta:{title:"Try salon management from Free Starter.",body:"Starter 30-day trial, paid plans, and cloud features are in preparation.",button:"View plans",support:"Support and contact"},
      footer:{productLinks:["Features","How it works","Plans","FAQ"]}
    },
    ja:{
      meta:{title:"B-tory｜BtoBサロン在庫・発注・納品・領収書管理アプリ",description:"B-toryは、Free Starterから始められる美容サロン向けBtoB管理アプリ。材料・店販商品・発注・納品・領収書・請求書を写真とバーコードで一連管理します。",ogTitle:"B-tory｜サロン向け在庫・発注管理アプリ",ogDescription:"Free Starterから始められるサロン管理アプリ。材料、発注、納品、領収書、レポートまで一連で管理。",twitterDescription:"サロンの在庫・発注・納品・領収書管理を一連で。Free Starterから開始予定。",schemaDescription:"美容サロン向けの在庫・発注・納品・領収書・書類管理BtoBアプリ。"},
      nav:["機能","料金","FAQ","プライバシー","サポート"],
      headerCta:"プランを見る",
      hero:{eyebrow:"現役美容師の声から生まれた、サロン管理アプリ",title:heroTitle("今日からスマホが、",["サロンの","在庫管理端末に。"]),subhead:"紙やExcelの抜け漏れを減らし、在庫・発注・納品・領収書までその場で一元管理。",lead:"B-toryは、Excel/CSVや既存の在庫表から始めて、写真・バーコードでも商品を登録できるサロン向け業務アプリです。仕入先別・メーカー別・カテゴリ別に整理し、要発注の確認、発注書作成、入荷待ち、納品登録、領収書保存まで、サロンワークの流れに合わせて使えます。",cta:"Free Starterで試す予定",guide:"30日無料トライアルを見る",support:"使い方を見る",note:"Free Starterから開始予定。Starterは30日無料トライアルも準備中です。iPhone / iPad / Mac / Windows 対応予定。"},
      problems:{eyebrow:"Problems",title:"紙・Excel・メモの管理から、サロン専用の流れへ。",body:"在庫が分からない、発注がバラバラ、材料費が見えない。B-toryは、サロンの材料管理を「見える・まとまる・残せる」流れに変えます。",before:["Before: 在庫状況が見えない","Before: 発注がバラバラ","Before: 届いたか確認しづらい","Before: 領収書が探せない","Before: 材料費が見えない","Before: 管理が続かない"],arrow:"B-toryで",titles:["在庫数と要発注を見える化","仕入先別・メーカー別・カテゴリ別に整理","入荷待ちから納品登録まで管理","領収書・納品書・請求書をまとめて保存","材料費率と使用傾向を確認","スマホでもPCでも、シンプルに続けやすく"],bodies:["棚卸や数量調整を反映し、今ある数と足りない商品を一覧で確認できます。","ディーラー発注にも、メーカー管理にも。サロンに合う見方で整理できます。","発注済みの商品を入荷待ちにし、届いたら納品登録で在庫に反映できます。","書類を写真やPDFで保存し、発注番号・仕入先・商品名であとから探せます。","在庫や使用データから、材料費率や薬剤使用の傾向を見える化できます。","一人サロン・小規模サロンでも始めやすく、現場とバックオフィスの両方で使いやすい設計です。"]},
      features:{eyebrow:"B-toryにできること",title:"在庫確認から発注、納品、領収書管理まで。",body:"日々の数の確認だけでなく、商品登録、発注書作成、納品登録、領収書保存、材料費率の確認まで、サロンの材料管理に必要な機能をまとめています。",points:["01","02","03","04","05","06","07","08"],titles:["かんたんデータ登録","在庫数の管理","仕入先別・メーカー別に整理","要発注の確認","発注書・発注本文を作成","入荷待ち・納品登録","領収書・納品書・請求書を保存","材料費率と使用傾向を確認"],bodies:["Excel/CSVや既存の在庫表から商品を取り込み、写真・バーコードでも登録できます。まずは商品名と在庫数だけでも始められます。","カラー剤、店販商品、備品などの在庫数を確認・更新できます。営業中でも今ある数をすぐに見つけやすくします。","仕入先別、メーカー別、カテゴリ別に、サロンに合わせた見方で商品を整理できます。","発注点を下回った商品を確認し、足りない材料や店販商品を見逃しにくくします。","B-tory標準発注書、Excelテンプレート、メール/LINE/WhatsApp本文を作成できます。送信はユーザーが確認して行います。","発注済みの商品を入荷待ちにし、届いたら納品登録で在庫に反映できます。一部納品にも対応予定です。","在庫に関わる書類を写真やPDFで保存し、発注番号、仕入先、商品名であとから探せます。","材料費率や薬剤使用の傾向を確認し、サロン経営の見直しに役立てられます。"]},
      workflow:{eyebrow:"How it works",title:"B-toryの基本の流れ",body:"商品登録から発注、納品、領収書保存まで。サロンワークに沿って使えます。",titles:["商品を登録","在庫をチェック","要発注を確認","発注書を作成","納品登録","領収書を保存","レポートで確認"],bodies:["Excel/CSVから取り込み、写真・バーコードでも登録。","営業中でも数量を確認。","足りない商品を見逃しにくく。","仕入先ごとに発注書や本文を作成。","届いた商品を登録して在庫に反映。","領収書・納品書・請求書を写真やPDFで保存。","材料費率や使用傾向を確認。"]},
      plan:{eyebrow:"Pricing",title:"サロンの規模に合わせて選べるプラン",body:"まずはFree Starterで小さく試して、本格運用はStarterへ。チーム運用や複数端末はPro、連携や自動化はMaxで対応予定です。"},
      pricing:{labels:["Free Starter","Starter","Pro","Max"],prices:["¥0","¥1,980/月","¥4,980/月 予定","¥9,800/月〜 予定"],subs:["","年額 ¥19,800/年 予定","年額 ¥49,800/年 予定",""],titles:["まず試したいサロンに","一人サロン・小規模サロンの本格運用に","チーム運用・複数端末に","複数店舗・連携・自動化に"],descriptions:["B-toryの基本フローを小さく試せる体験用プラン。本格的な在庫・発注・領収書管理にはStarterをおすすめします。","日々の在庫確認、発注、納品、領収書管理をしっかり使いたいサロン向け。B-toryの中心プランです。","複数スタッフ、複数端末、クラウドバックアップを使いたいサロン向け。","複数店舗、外部連携、AI/OCRなどの高度な運用を検討するサロン向け。"],features:[["商品登録 50件まで","写真登録 30枚まで","書類保存 10件まで","書類容量 100MBまで","仕入先 5件まで","スタッフ 1名 / 端末 1台","発注書作成 月5件まで","Excelテンプレート発注書 月2件まで","材料費率は簡易表示のみ","バックアップは手動JSONのみ","クラウド同期なし","複数端末同期なし","スタッフ共有なし"],["商品登録 300件まで","写真登録 300枚まで","書類保存 1GBまで","仕入先 30件まで","ご利用アカウント 1名（最大2台まで同期）","発注書作成 制限緩和","Excelテンプレート発注書 制限緩和","仕入先別・メーカー別・カテゴリ別整理","領収書・納品書・請求書管理","材料費率レポート","クラウドバックアップ（自動）","JSONバックアップ","iPhone / iPad / Mac / Windows 対応予定"],["Starterの全機能","商品登録 1000件まで","写真登録 1000枚まで","書類保存 5GBまで","仕入先 100件まで","スタッフ 5名まで","B-toryアカウント","クラウドバックアップ","複数端末・複数アカウント同期","スタッフ招待・権限管理","操作履歴","詳細分析","書類容量アップ","写真容量アップ"],["Proの全機能","商品登録 大容量／要相談","写真登録 大容量／要相談","書類保存 50GB〜","10スタッフ以上","複数店舗","POS/予約サイト連携","会計連携","AI/OCR","LINE公式連携","WhatsApp Business","専用サポート"]],buttons:["Free Starterで開始予定","Starter準備中","Pro準備中","Max準備中"],starterNote:"スタッフを招待して複数人で同じデータを使いたい場合は、Proプランがおすすめです。",notes:["※価格・機能・無料トライアルは予定です。初回リリースではFree Starterから提供予定です。","※Starter 30日無料トライアル、有料プラン、アカウント機能、クラウドバックアップ、複数端末同期、AI/OCR、外部連携は今後のアップデートで提供を検討しています。"]},
      trial:{eyebrow:"30日 Starterトライアル",title:"迷ったら、Starterを30日お試し。",body:"商品登録、写真保存、発注書作成、納品登録、領収書管理まで。本格運用向けのStarterを、実際のサロン業務で試せるよう準備中です。",button:"30日無料トライアル準備中",note:"正式提供時に、料金・期間・更新条件を分かりやすく表示します。"},
      download:{eyebrow:"Apps",title:"対応予定アプリ",body:"B-toryは、iPhone・iPad・Mac・Windowsアプリとして展開予定です。",bodies:["Apple Storeで公開予定。営業中の在庫チェックや領収書保存をスマホで。","Apple Storeで公開予定。タブレットの大きな画面で商品整理や発注確認を。","Mac版 準備中。サロンのバックオフィスで商品整理やレポート確認を。","Windows版 準備中。PCでの事務作業や在庫整理にも対応予定。"],buttons:["Apple Storeで公開予定","Apple Storeで公開予定","Mac版 準備中","Windows版 準備中"]},
      faq:{title:"よくある質問",questions:["B-toryは無料で使えますか？","Free Starterだけでサロン運用できますか？","Starterを無料で試せますか？","Starterはいくらですか？","ProやMaxはありますか？","トライアル後は自動で課金されますか？","B-toryはどの端末で使えますか？","PCでも使えますか？","iPhoneとPCでデータは同期できますか？","アカウント登録は必要ですか？","ExcelやNumbersの在庫表から登録できますか？","最初に全部の商品情報を入力しないと使えませんか？","パソコンが苦手でも使えますか？","発注は自動送信されますか？","POSや予約サイトと自動連携しますか？","Free Starterでは何件まで登録できますか？","Starterでは何件まで管理できますか？","小規模サロンにはどのプランが合いますか？","Proでは何が増えますか？"],answers:["Free Starterとして無料で試せるプランを提供予定です。ただし、Free Starterは体験用プランで、商品登録数・写真枚数・書類保存数・発注書作成数に制限があります。日々の在庫・発注・領収書管理にはStarterをおすすめします。","Free Starterは、B-toryの基本フローを小さく試すためのプランです。登録数や保存容量に制限があるため、本格的なサロン運用にはStarterをおすすめします。","Starterは30日無料トライアルを準備中です。商品登録、写真保存、発注書作成、納品登録、領収書管理など、本格運用向けの機能を実際のサロン業務で試せる予定です。","Starterは月額1,980円、年額19,800円を予定しています。一人サロン・小規模サロンの本格運用向けのプランです。価格や提供内容は正式リリース前に変更される場合があります。","Proは月額4,980円、Maxは月額9,800円〜を予定しています。クラウドバックアップ、複数端末同期、スタッフ共有、外部連携、AI/OCRなどは今後のアップデートで検討しています。","正式提供時の課金方法に合わせて、開始前に料金・期間・更新条件を分かりやすく表示します。現時点ではStarter 30日無料トライアルは準備中です。","B-toryは、iPhone・iPad・Mac・Windowsアプリとして展開予定です。まずはiOS/iPadOS版を中心に準備し、Mac/Windowsのデスクトップアプリ版も順次対応予定です。","はい。Mac/Windows向けのデスクトップアプリ版を準備予定です。公開までは公式サイトで案内します。","初回リリースでは端末内保存を中心に開始予定です。将来のアカウント機能・クラウドバックアップ・複数端末同期についても検討しています。提供する場合は、保存される情報や利用目的を明示します。","初回リリースのFree Starterは、ログインなしでも使い始められる予定です。将来のStarter / Proでは、アカウント登録、Appleログイン、Googleログイン、メール登録、クラウドバックアップなどを検討しています。","はい。CSVまたはExcel形式のファイルから商品データを取り込めるようにする予定です。Numbersを使っている場合は、Excel形式またはCSV形式で書き出してから取り込めます。まずは商品名、カテゴリ、仕入先、在庫数などをまとめて登録し、後から写真やバーコードを追加できます。","いいえ。まずは商品名と在庫数だけでも始められます。必要に応じて、カテゴリ、メーカー、仕入先、写真、バーコードを後から追加できます。","はい。最初はExcel/CSVからまとめて取り込み、その後はスマホで写真やバーコードを使って管理できます。サロンワークの流れに合わせて、少しずつ整理していける設計を目指しています。","いいえ。B-toryは発注書や発注本文を作成しますが、送信はユーザーが内容を確認して行います。","初回リリースでは自動連携は行いません。外部連携はMaxなどの将来プランで検討しています。","Free Starterでは、商品登録50件まで、写真登録30枚まで、書類保存10件までを予定しています。B-toryの基本フローを試せる体験用プランです。本格的なサロン運用にはStarterをおすすめします。","Starterでは、商品登録300件まで、写真登録300枚まで、書類保存1GBまでを予定しています。一人サロン・小規模サロンの本格運用に向けた中心プランです。","まずB-toryの流れを試したい場合はFree Starter、本格的に日々の在庫・発注・納品・領収書管理を行う場合はStarterをおすすめします。複数スタッフや複数端末で共有したい場合はProを検討してください。","Proでは、商品登録数や書類容量の拡張に加えて、B-toryアカウント、クラウドバックアップ、複数端末同期、スタッフ共有、操作履歴、詳細分析などを提供する予定です。"]},
      cta:{title:"Free Starterから、サロン管理を小さく試す。",body:"Starter 30日無料トライアル、有料プラン、クラウド機能は準備中です。",button:"プランを見る",support:"サポート・お問い合わせ"},
      footer:{productLinks:["機能","使い方","料金プラン","FAQ"]}
    }
  };
  merge(BUSINESS_COPY.zh=BUSINESS_COPY.zh||{},{
    nav:["功能","价格","FAQ","隐私","支持"],headerCta:"查看计划",
    hero:{eyebrow:"源自现役发型师声音的沙龙管理应用",title:heroTitle("从今天起，","让手机成为沙龙库存管理工具。"),subhead:"减少纸张和 Excel 的遗漏，把库存、订货、入库和收据放进一个流程。",lead:"B-tory 是面向沙龙的业务应用，可从 Excel/CSV 或现有库存表开始，再添加照片和条码。可按供应商、制造商和分类整理，确认需订货商品、创建订单、管理等待入库、登记入库并保存收据，贴合沙龙工作流程。",cta:"Free Starter 计划提供",guide:"查看30天试用",support:"查看使用方法",note:"计划从 Free Starter 开始。Starter 30天免费试用也在准备中。计划支持 iPhone / iPad / Mac / Windows。"},
    features:{eyebrow:"B-tory 能做什么",title:"从库存确认到订货、入库和收据管理。",body:"不仅是每天的数量确认，还汇集了商品登记、订单创建、入库登记、收据保存、材料费率确认等沙龙材料管理所需的功能。",points:["01","02","03","04","05","06","07","08"],titles:["简单数据登记","库存数量管理","按供应商和制造商整理","需订货确认","创建订单和订货正文","待入库和入库登记","保存收据、送货单和发票","确认材料费率和使用趋势"],bodies:["可从 Excel/CSV 或现有库存表导入商品，也可用照片和条码登记。先只用商品名和库存数也能开始。","可确认和更新染膏、店售商品、备品等的库存数量。营业中也能快速找到现有数量。","可按供应商、制造商和分类，以适合沙龙的视图整理商品。","确认低于订货点的商品，减少遗漏不足的材料或店售商品。","可创建 B-tory 标准订单、Excel 模板、邮件/LINE/WhatsApp 正文。发送由用户确认后进行。","把已订货商品设为待入库，到货后通过入库登记反映库存。也计划支持部分入库。","把与库存相关的文件用照片或 PDF 保存，可按订单号、供应商、商品名之后查找。","确认材料费率和药剂使用趋势，帮助回顾沙龙经营。"]},
    plan:{eyebrow:"Pricing",title:"按沙龙规模选择计划",body:"先用 Free Starter 小规模试用，正式运营可选择 Starter。团队和多设备计划用 Pro，联动和自动化计划用 Max。"},
    pricing:{labels:["Free Starter","Starter","Pro","Max"],prices:["¥0","¥1,980/月","¥4,980/月 计划","¥9,800/月起 计划"],subs:["","¥19,800/年 计划","¥49,800/年 计划",""],titles:["想先试用的沙龙","一人沙龙和小型沙龙的正式运营","团队运营和多设备","多店铺、联动和自动化"],descriptions:["可小规模试用 B-tory 基本流程的体验版。正式的库存、订货和收据管理建议使用 Starter。","面向希望扎实使用每日库存确认、订货、入库和收据管理的沙龙。B-tory 的核心计划。","面向希望使用多员工、多设备和云备份的沙龙。","面向考虑多店铺、外部联动、AI/OCR等高级运营的沙龙。"],features:[["商品登记最多50件","照片最多30张","文件最多10件","文件容量最多100MB","供应商最多5个","员工1名 / 设备1台","订单每月最多5件","Excel订单模板每月最多2件","材料费率仅简易显示","仅手动JSON备份","无云同步","无多设备同步","无员工共享"],["商品登记最多300件","照片最多300张","文件最多1GB","供应商最多30个","使用账号 1 名（最多同步2台设备）","订单创建限制放宽","Excel订单模板限制放宽","按供应商/制造商/分类整理","收据/送货单/发票管理","材料费率报告","云备份（自动）","JSON备份","iPhone / iPad / Mac / Windows 计划支持"],["Starter全部功能","商品登记最多1000件","照片最多1000张","文件最多5GB","供应商最多100个","员工最多5名","B-tory账号","云备份","多设备・多账号同步","员工邀请・权限管理","操作历史","详细分析","文件容量提升","照片容量提升"],["Pro全部功能","商品大容量／需咨询","照片大容量／需咨询","文件50GB起","10名以上员工","多店铺","POS/预约网站联动","会计联动","AI/OCR","LINE官方联动","WhatsApp Business","专属支持"]],buttons:["Free Starter 计划开始","Starter 准备中","Pro 准备中","Max 准备中"],starterNote:"如果想邀请员工、多人共用同一份数据，推荐 Pro 计划。",notes:["※价格、功能和免费试用均为计划。首次发布计划从 Free Starter 开始。","※Starter 30天试用、付费计划、账号、云备份、多设备同步、AI/OCR和外部联动均在未来更新中考虑。"]},
      trial:{eyebrow:"30天 Starter 试用",title:"犹豫的话，先试用 Starter 30 天。",body:"商品登记、照片保存、订单创建、入库登记到收据管理。正在准备让你在真实沙龙业务中试用面向正式运营的 Starter。",button:"30天免费试用准备中",note:"正式提供时，将清晰显示价格、期限和续订条件。"},
    download:{eyebrow:"Apps",title:"计划支持的应用",body:"B-tory 计划推出 iPhone、iPad、Mac、Windows 应用。",bodies:["计划在 Apple Store 发布。营业中可用手机确认库存和保存收据。","计划在 Apple Store 发布。用平板大屏进行商品整理和订货确认。","Mac版准备中。用于沙龙后台的商品整理和报表确认。","Windows版准备中。计划支持PC上的事务工作和库存整理。"],buttons:["Apple Store 即将发布","Apple Store 即将发布","Mac版准备中","Windows版准备中"]},
    faq:{title:"常见问题",questions:["B-tory 可以免费使用吗？","Free Starter 可以做什么？","可以免费试用 Starter 吗？","Starter 多少钱？","有 Pro 和 Max 吗？","试用后会自动扣费吗？","B-tory 支持哪些设备？","可以在电脑上使用吗？","iPhone 和电脑可以同步数据吗？","需要账号吗？","可以从 Excel 或 Numbers 库存表登记吗？","一开始必须输入所有商品信息吗？","不擅长电脑也能使用吗？","订单会自动发送吗？","会自动连接 POS 或预约网站吗？","Free Starter 最多能登记多少件？","Starter 最多能管理多少件？","小型沙龙适合哪个计划？","Pro 增加了什么？"],answers:["首次发布计划提供 Free Starter，可免费试用。面向正式运营的 Starter / Pro / Max 付费计划也在准备中。","计划可小规模试用商品登记、照片/条码登记、需订货确认、订单创建、入库、收据/送货单/发票保存等。商品数、照片数、文件数和容量将设有限制。","Starter 30天免费试用正在准备中。计划可在真实沙龙业务中试用商品登记、照片保存、订单创建、入库和收据管理。","Starter 计划为月费1,980日元、年费19,800日元，面向一人沙龙和小型沙龙。价格和内容可能在正式发布前调整。","Pro 计划月费4,980日元，Max 计划月费9,800日元起。云备份、多设备同步、员工共享、外部联动、AI/OCR等将在未来更新中考虑。","正式提供收费时，会在开始前清楚显示价格、期间和更新条件。目前 Starter 30天免费试用仍在准备中。","B-tory 计划支持 iPhone、iPad、Mac、Windows 应用。首先以 iOS/iPadOS 版为中心准备，Mac/Windows 桌面版也计划陆续支持。","可以。Mac/Windows 桌面应用版正在准备中，公开前会在官方网站通知。","首次发布计划以设备内保存为中心。未来也在考虑账号功能、云备份和多设备同步。提供这些功能时，将明确说明保存的信息和使用目的。","首次发布的 Free Starter 计划无需登录即可开始使用。未来 Starter / Pro 也在考虑账号注册、Apple登录、Google登录、邮箱注册和云备份。","可以。计划支持从 CSV 或 Excel 文件导入商品数据。使用 Numbers 时，请先导出为 Excel 或 CSV 格式。可先批量登记商品名、分类、供应商和库存数量，之后再添加照片和条码。","不需要。可以先从商品名和库存数量开始。分类、制造商、供应商、照片和条码可之后按需要追加。","可以。先从 Excel/CSV 批量导入，之后用手机通过照片和条码进行日常管理。B-tory 目标是让你按照沙龙工作流程逐步整理。","不会。B-tory 创建订单和订货正文，但发送由用户确认后操作。","首次发布不提供自动联动。外部联动将在 Max 等未来计划中考虑。","Free Starter 计划支持商品登记最多50件、照片最多30张、文件最多10件。这是体验 B-tory 流程的体验版。正式的沙龙运营建议使用 Starter。","Starter 计划支持商品登记最多300件、照片最多300张、文件最多1GB。是面向一人沙龙和小型沙龙正式运营的中心计划。","想先体验 B-tory 流程时建议 Free Starter；正式进行日常库存、订货、入库和收据管理时建议 Starter。需要多名员工或多设备共享时，请考虑 Pro。","Pro 计划在扩大商品登记数和文件容量的基础上，提供 B-tory 账号、云备份、多设备同步、员工共享、操作历史和详细分析等。"]},
    cta:{title:"从 Free Starter 小规模试用沙龙管理。",body:"Starter 30天试用、付费计划和云功能正在准备中。",button:"查看计划",support:"支持与联系"},footer:{productLinks:["功能","使用方法","价格计划","FAQ"]}
  });
  merge(BUSINESS_COPY.es=BUSINESS_COPY.es||{},{
    nav:["Funciones","Planes","FAQ","Privacidad","Soporte"],headerCta:"Ver planes",
    hero:{eyebrow:"Una app de gestión de salón inspirada por estilistas en activo",title:heroTitle("Convierte tu móvil",["en una herramienta de\u00a0","inventario para tu salón."]),subhead:"Reduce huecos del papel y Excel. Gestiona inventario, pedidos, recepción y recibos en un solo flujo.",lead:"B-tory es una app de trabajo para salones que puede empezar desde Excel/CSV o listas de inventario existentes, y luego añadir fotos y códigos. Organiza por proveedor, fabricante y categoría; revisa bajo stock, crea órdenes, gestiona pendientes, registra recepción y guarda recibos siguiendo el flujo del salón.",cta:"Free Starter previsto",guide:"Ver prueba de 30 días",support:"Ver cómo funciona",note:"Previsto iniciar con Free Starter. También se prepara una prueba de 30 días para Starter. Previsto para iPhone / iPad / Mac / Windows."},
    features:{eyebrow:"Lo que B-tory puede hacer",title:"Del control de stock a pedidos, recepción y recibos.",body:"Más allá de los conteos diarios, B-tory reúne las funciones que un salón necesita para gestionar materiales: registro de productos, órdenes, recepción, guardado de recibos y ratio de coste material.",points:["01","02","03","04","05","06","07","08"],titles:["Registro de datos sencillo","Gestión de stock","Organiza por proveedor y fabricante","Revisión de bajo stock","Crea órdenes y mensajes","Pendientes y recepción","Guarda recibos, albaranes y facturas","Coste de materiales y tendencias"],bodies:["Importa productos desde Excel/CSV o una tabla existente, y registra con fotos y códigos. Puedes empezar solo con nombres y stock.","Comprueba y actualiza el stock de coloración, productos de venta y suministros. Encuentra rápido lo que tienes, incluso durante el salón.","Organiza productos por proveedor, fabricante y categoría con la vista que encaje con tu salón.","Revisa productos por debajo del punto de pedido para no pasar por alto materiales o productos de venta.","Crea una orden B-tory, plantilla Excel o mensaje de email/LINE/WhatsApp. El envío lo hace el usuario tras revisar.","Marca los pedidos como pendientes y registra la recepción para reflejar el stock al llegar. Recepción parcial prevista.","Guarda documentos de inventario como fotos o PDF y encuéntralos después por número de pedido, proveedor o producto.","Revisa el ratio de coste de materiales y las tendencias de uso para ayudar a repensar la operación del salón."]},
    plan:{eyebrow:"Pricing",title:"Planes según el tamaño del salón",body:"Empieza pequeño con Free Starter y pasa a Starter para operación real. Pro está previsto para equipos y varios dispositivos, Max para integraciones y automatización."},
    pricing:{labels:["Free Starter","Starter","Pro","Max"],prices:["¥0","¥1,980/mes","¥4,980/mes previsto","Desde ¥9,800/mes previsto"],subs:["","¥19,800/año previsto","¥49,800/año previsto",""],titles:["Para salones que quieren probar","Para salones pequeños y de una persona","Para equipos y varios dispositivos","Para multi-sede, integraciones y automatización"],descriptions:["Un plan de prueba para probar el flujo básico de B-tory a pequeña escala. Para inventario, pedidos y recibos reales, recomendamos Starter.","Para salones que quieren usar a fondo el control diario de stock, pedidos, recepción y recibos. El plan central de B-tory.","Para salones que quieren varios miembros, varios dispositivos y backup en la nube.","Para salones que consideran varias sedes, integraciones, AI/OCR y operación avanzada."],features:[["Hasta 50 productos","Hasta 30 fotos","Hasta 10 documentos","Hasta 100MB para documentos","Hasta 5 proveedores","1 persona / 1 dispositivo","Hasta 5 órdenes al mes","2 plantillas Excel al mes","Solo coste de materiales simple","Solo backup JSON manual","Sin sincronización en nube","Sin sincronización multi-dispositivo","Sin uso compartido con staff"],["Hasta 300 productos","Hasta 300 fotos","Hasta 1GB de documentos","Hasta 30 proveedores","1 cuenta de usuario (sincroniza hasta 2 dispositivos)","Límites de órdenes ampliados","Límites de Excel ampliados","Organización por proveedor/fabricante/categoría","Recibos/albaranes/facturas","Reporte de coste material","Backup en la nube (automático)","Backup JSON","iPhone / iPad / Mac / Windows previsto"],["Todo Starter","Hasta 1000 productos","Hasta 1000 fotos","Hasta 5GB de documentos","Hasta 100 proveedores","Hasta 5 personas","Cuenta B-tory","Backup en la nube","Sincronización multi-dispositivo y multi-cuenta","Invitación de staff y gestión de permisos","Historial de acciones","Análisis avanzado","Más capacidad de documentos","Más capacidad de fotos"],["Todo Pro","Gran capacidad / a consultar","Gran capacidad de fotos / a consultar","50GB+ de documentos","Más de 10 personas","Varias sedes","Integración POS / reservas","Integración contable","AI/OCR","LINE oficial","WhatsApp Business","Soporte dedicado"]],buttons:["Free Starter previsto","Starter en preparación","Pro en preparación","Max en preparación"],starterNote:"Para invitar a tu equipo y usar los mismos datos entre varias personas, recomendamos el plan Pro.",notes:["* Precios, funciones y pruebas gratuitas están previstos. El primer lanzamiento está previsto con Free Starter.","* La prueba de Starter, planes de pago, cuentas, backup en nube, sincronización, AI/OCR e integraciones se consideran para futuras actualizaciones."]},
      trial:{eyebrow:"Prueba Starter de 30 días",title:"¿Dudas? Prueba Starter 30 días.",body:"Registro de productos, fotos, órdenes, recepción y gestión de recibos. Estamos preparando una forma de probar el plan Starter de operación completa en el trabajo real del salón.",button:"Prueba de 30 días en preparación",note:"Cuando se ofrezca oficialmente, se mostrarán con claridad el precio, el periodo y las condiciones de renovación."},
    download:{eyebrow:"Apps",title:"Apps previstas",body:"B-tory está previsto como app para iPhone, iPad, Mac y Windows.",bodies:["Previsto para Apple Store. Revisa inventario y guarda recibos desde el móvil durante el servicio.","Previsto para Apple Store. Usa la pantalla grande del tablet para organizar productos y revisar pedidos.","Versión Mac en preparación. Para organización de productos y reportes en back office.","Versión Windows en preparación. Prevista para trabajo administrativo e inventario en PC."],buttons:["Previsto en Apple Store","Previsto en Apple Store","Versión Mac en preparación","Versión Windows en preparación"]},
    faq:{title:"Preguntas frecuentes",questions:["¿B-tory es gratis?","¿Qué permite Free Starter?","¿Puedo probar Starter gratis?","¿Cuánto cuesta Starter?","¿Habrá Pro y Max?","¿Se cobra automáticamente después de la prueba?","¿Qué dispositivos soportará B-tory?","¿Puedo usarlo en computadora?","¿Se sincronizan datos entre iPhone y PC?","¿Necesito cuenta?","¿Puedo registrar desde hojas de inventario de Excel o Numbers?","¿Debo introducir todos los datos de productos al inicio?","¿Puedo usarlo aunque no se me dé bien la computadora?","¿Los pedidos se envían automáticamente?","¿Se conecta automáticamente con POS o reservas?","¿Cuántos productos puedo registrar en Free Starter?","¿Cuántos puede gestionar Starter?","¿Qué plan encaja con un salón pequeño?","¿Qué añade Pro?"],answers:["El primer lanzamiento está previsto con Free Starter para probar gratis. También se preparan planes Starter / Pro / Max para operación completa.","Free Starter está previsto para probar en pequeño registro de productos, fotos/códigos, bajo stock, órdenes, recepción y recibos/albaranes/facturas. Habrá límites de cantidad y capacidad.","Starter prepara una prueba gratuita de 30 días para probar registro, fotos, órdenes, recepción y recibos en el trabajo real del salón.","Starter está previsto a ¥1,980/mes o ¥19,800/año para salones pequeños y de una persona. Precio y contenido pueden cambiar antes del lanzamiento oficial.","Pro está previsto a ¥4,980/mes y Max desde ¥9,800/mes. Backup en nube, sincronización, staff, integraciones y AI/OCR se consideran para futuras actualizaciones.","Cuando se ofrezca facturación formal, precio, período y renovación se mostrarán claramente antes de empezar. La prueba de 30 días de Starter está en preparación.","B-tory está previsto para iPhone, iPad, Mac y Windows. Primero se prepara iOS/iPadOS y después versiones de escritorio Mac/Windows.","Sí. Se preparan versiones de escritorio para Mac y Windows. La disponibilidad se anunciará en el sitio oficial.","El primer lanzamiento está previsto con almacenamiento local. También se consideran cuentas, backup en nube y sincronización multi-dispositivo. Si se ofrecen, se explicarán la información guardada y los fines de uso.","Free Starter está previsto para comenzar sin login. En Starter / Pro se consideran cuenta, Apple login, Google login, email y backup en nube.","Sí. Está previsto importar datos de productos desde archivos CSV o Excel. Si usas Numbers, exporta primero en formato Excel o CSV. Puedes registrar nombres de productos, categorías, proveedores y cantidades juntas, y añadir fotos y códigos después.","No. Puedes empezar solo con el nombre del producto y la cantidad en stock. Categorías, fabricante, proveedor, fotos y códigos pueden añadirse más tarde según sea necesario.","Sí. Primero importa desde Excel/CSV y después gestiona desde el móvil con fotos y códigos de barras. B-tory está pensado para organizar poco a poco según el flujo del salón.","No. B-tory crea órdenes y textos, pero el usuario revisa y envía.","El primer lanzamiento no incluye integraciones automáticas. Se consideran para planes futuros como Max.","Free Starter prevé hasta 50 productos, 30 fotos y 10 documentos. Es un plan de prueba para experimentar el flujo de B-tory. Para una operación real del salón, recomendamos Starter.","Starter prevé hasta 300 productos, 300 fotos y 1GB de documentos. Es el plan central para salones pequeños y de una persona.","Para probar primero el flujo de B-tory, elige Free Starter; para gestionar a diario inventario, pedidos, recepción y recibos, elige Starter. Para compartir entre varias personas o dispositivos, considera Pro.","Pro prevé ampliar el número de productos y la capacidad de documentos, además de cuenta B-tory, backup en la nube, sincronización multi-dispositivo, uso compartido con staff, historial de acciones y análisis avanzado."]},
    cta:{title:"Prueba la gestión del salón desde Free Starter.",body:"La prueba de Starter, planes de pago y funciones en nube están en preparación.",button:"Ver planes",support:"Soporte y contacto"},footer:{productLinks:["Funciones","Cómo funciona","Planes","FAQ"]}
  });
  merge(BUSINESS_COPY.en,{
    mobileHero:{title:"Inventory, ordering, and receiving in one flow",slides:[
      {title:"B-tory is a salon inventory app.",tags:["Inventory","Orders","Receiving","Receipts"]},
      {title:"Start from Excel, then manage on your phone.",tags:["Excel","CSV","Photos","Barcodes"]},
      {title:"Group low-stock items by supplier.",tags:["Low stock","Order sheet","Waiting"]},
      {title:"Receive deliveries and keep receipts.",tags:["Receiving","Receipts","Invoices","Reports"]}
    ]}
  });
  merge(BUSINESS_COPY.ja,{
    mobileHero:{title:"在庫・発注・納品を、ひとつの流れで",slides:[
      {title:"美容サロンの在庫アプリは、B-tory。",tags:["在庫","発注","納品","領収書"]},
      {title:"Excelから始めて、スマホで管理。",tags:["Excel","CSV","写真","バーコード"]},
      {title:"足りない商品を、仕入先ごとに発注。",tags:["要発注","発注書","入荷待ち"]},
      {title:"届いたら納品登録。領収書も保存。",tags:["納品","領収書","請求書","レポート"]}
    ]}
  });
  merge(BUSINESS_COPY.zh,{
    mobileHero:{title:"库存、订货、入库放进一个流程",slides:[
      {title:"B-tory 是美容沙龙库存应用。",tags:["库存","订货","入库","收据"]},
      {title:"从 Excel 开始，用手机管理。",tags:["Excel","CSV","照片","条码"]},
      {title:"缺货商品按供应商整理订货。",tags:["需订货","订单","待入库"]},
      {title:"到货后登记入库，收据也保存。",tags:["入库","收据","发票","报表"]}
    ]}
  });
  merge(BUSINESS_COPY.es,{
    mobileHero:{title:"Inventario, pedidos y recepción en un solo flujo",slides:[
      {title:"B-tory es una app de inventario para salones.",tags:["Inventario","Pedidos","Recepción","Recibos"]},
      {title:"Empieza desde Excel y gestiona desde el móvil.",tags:["Excel","CSV","Fotos","Códigos"]},
      {title:"Agrupa faltantes por proveedor.",tags:["Bajo stock","Orden","Pendiente"]},
      {title:"Registra recepciones y guarda recibos.",tags:["Recepción","Recibos","Facturas","Reportes"]}
    ]}
  });
  LANGS.forEach(function(lang){merge(COPY[lang],BUSINESS_COPY[lang]||{});});

  function applySlide(root,slide){
    if(!root||!slide){return;}
    item(".hero-slide__kicker span",0,slide.kicker[0],root);
    item(".hero-slide__kicker small",0,slide.kicker[1],root);
    text(".hero-slide__copy h2",slide.title,root);
    text(".hero-slide__copy > p:not(.hero-slide__kicker)",slide.body,root);
  }

  function applyLanguage(lang){
    var copy=COPY[lang]||COPY.en;
    var meta=copy.meta;
    document.documentElement.lang=meta.lang;
    document.title=meta.title;
    setMeta("description",meta.description);
    setProp("og:title",meta.ogTitle);
    setProp("og:description",meta.ogDescription);
    setProp("og:locale",meta.locale);
    setMeta("twitter:title",meta.ogTitle);
    setMeta("twitter:description",meta.twitterDescription);

    var json=one('script[type="application/ld+json"]');
    if(json){
      try{
        var data=JSON.parse(json.textContent);
        data.description=meta.schemaDescription;
        data.inLanguage=lang;
        json.textContent=JSON.stringify(data,null,2);
      }catch(e){}
    }

    items(".nav-links a",copy.nav);
    attr("#navLinks","aria-label",lang==="ja"?"メインナビゲーション":"Main navigation");
    attr("#menuToggle","aria-label",copy.menuLabel);
    text(".site-header .nav-cta .btn-primary",copy.headerCta);

    text(".hero-grid > div:first-child > .eyebrow",copy.hero.eyebrow);
    html(".hero h1.display",copy.hero.title);
    text(".hero-subhead",copy.hero.subhead||"");
    text(".hero .lead",copy.hero.lead);
    text(".hero .hero-cta .btn-primary",copy.hero.cta);
    item(".hero .hero-cta .btn-ghost",0,copy.hero.guide);
    item(".hero .hero-cta .btn-ghost",1,copy.hero.support||copy.hero.guide);
    text(".hero-note",copy.hero.note);
    if(copy.mobileHero){
      text(".hero-mobile-caption strong",copy.mobileHero.title);
      all(".hero-mobile-slide").forEach(function(slide,index){
        var data=copy.mobileHero.slides[index];
        if(!data){return;}
        text("h2",data.title,slide);
        all("p span",slide).forEach(function(tag,tagIndex){
          tag.textContent=(data.tags&&data.tags[tagIndex])||"";
          tag.hidden=!tag.textContent;
        });
      });
    }

    text("#download .section-head .eyebrow",copy.download.eyebrow);
    text("#download .section-head h2",copy.download.title);
    text("#download .section-head p",copy.download.body);
    items("#download .download-card h3",copy.download.titles);
    items("#download .download-card p",copy.download.bodies);
    items("#download .download-card .btn",copy.download.buttons);

    attr("[data-hero-flow]","aria-label",copy.slides.flowLabel);
    attr(".hero-flow__controls","aria-label",copy.slides.controls);
    all("[data-hero-slide]").forEach(function(el,index){el.setAttribute("aria-label",copy.slides.labels[index]);});
    all("[data-hero-dot]").forEach(function(el,index){el.setAttribute("aria-label",copy.slides.dots[index]);});
    applySlide(one(".hero-slide--brand"),copy.slides.brand);
    applySlide(one(".hero-slide--excel"),copy.slides.excel);
    applySlide(one(".hero-slide--photo"),copy.slides.photo);
    applySlide(one(".hero-slide--barcode"),copy.slides.barcode);
    applySlide(one(".hero-slide--reorder"),copy.slides.reorder);
    applySlide(one(".hero-slide--dealer"),copy.slides.dealer);
    applySlide(one(".hero-slide--delivery"),copy.slides.delivery);
    applySlide(one(".hero-slide--docs"),copy.slides.docs);

    items(".tag-row span",copy.slides.brand.tags);
    text(".hero-slide--photo .screen-title",copy.slides.photo.screenTitle);
    items(".hero-slide--photo .field-line",copy.slides.photo.fields);
    text(".hero-slide--photo .stock-pill",copy.slides.photo.stock);
    item(".hero-slide--photo .floating-card strong",0,copy.slides.photo.card[0]);
    item(".hero-slide--photo .floating-card span",0,copy.slides.photo.card[1]);
    text(".hero-slide--barcode .field-line.strong",copy.slides.barcode.status);
    item(".hero-slide--barcode .floating-card strong",0,copy.slides.barcode.result[0]);
    item(".hero-slide--barcode .floating-card span",0,copy.slides.barcode.result[1]);
    item(".board-head span",0,copy.slides.reorder.head[0]);
    item(".board-head strong",0,copy.slides.reorder.head[1]);
    copy.slides.reorder.rows.forEach(function(row,index){item(".order-row span",index,row[0]);item(".order-row b",index,row[1]);});
    text(".notice-badge",copy.slides.reorder.badge);
    copy.slides.dealer.suppliers.forEach(function(row,index){item(".dealer-card span",index,row[0]);item(".dealer-card strong",index,row[1]);});
    items(".channel-row span",copy.slides.dealer.channels);
    text(".order-preview small",copy.slides.dealer.note);
    items(".status-card",copy.slides.delivery.statuses);
    item(".stock-change span",0,copy.slides.delivery.stock[0]);
    item(".stock-change strong",0,copy.slides.delivery.stock[1]);
    items(".doc-card span",copy.slides.docs.docs);
    text(".report-card small",copy.slides.docs.report);
    text(".trend-card",copy.slides.docs.trend);

    text("#problems .section-head .eyebrow",copy.problems.eyebrow);
    text("#problems .section-head h2",copy.problems.title);
    text("#problems .section-head p",copy.problems.body);
    items("#problems .flow-card .before",copy.problems.before);
    text("#problems .flow-card .flow-arrow",copy.problems.arrow);
    items("#problems .flow-card h3",copy.problems.titles);
    items("#problems .flow-card p",copy.problems.bodies);

    text("#features .section-head .eyebrow",copy.features.eyebrow);
    text("#features .section-head h2",copy.features.title);
    text("#features .section-head p",copy.features.body);
    items("#features .feature-point",copy.features.points||[]);
    items("#features .feat h3",copy.features.titles);
    items("#features .feat p",copy.features.bodies);

    text("#difference .section-head .eyebrow",copy.difference.eyebrow);
    text("#difference .section-head h2",copy.difference.title);
    text("#difference .section-head p",copy.difference.body);
    if(copy.difference.titles){
      items("#difference .diff h3",copy.difference.titles);
      items("#difference .diff p",copy.difference.bodies||[]);
      items("#difference .reason-label",copy.difference.visualLabels||[]);
    }else{
      items("#difference .diff p",copy.difference.items);
    }

    text("#how .section-head .eyebrow",copy.workflow.eyebrow);
    text("#how .section-head h2",copy.workflow.title);
    text("#how .section-head p",copy.workflow.body);
    items("#how .step h4",copy.workflow.titles);
    items("#how .step p",copy.workflow.bodies);

    text("#plan .section-head .eyebrow",copy.plan.eyebrow);
    text("#plan .section-head h2",copy.plan.title);
    text("#plan .section-head p",copy.plan.body);
    if(copy.pricing){
      items("#plan .plan-label",copy.pricing.labels);
      items("#plan .price",copy.pricing.prices);
      all("#plan .price-sub").forEach(function(el,index){
        var cardIndex=[1,2][index];
        el.textContent=(copy.pricing.subs&&copy.pricing.subs[cardIndex])||"";
      });
      items("#plan .price-card h3",copy.pricing.titles);
      items("#plan .price-head > p:not(.price-sub)",copy.pricing.descriptions);
      all("#plan .price-card").forEach(function(card,index){
        items("li",(copy.pricing.features&&copy.pricing.features[index])||[],card);
      });
      items("#plan .price-card .btn",copy.pricing.buttons);
      items("#plan .plan-note p",copy.pricing.notes);
      if(copy.pricing.starterNote){text("#plan .price-card.featured .plan-foot",copy.pricing.starterNote);}
    }
    if(copy.trial){
      text("#starter-trial .trial-eyebrow",copy.trial.eyebrow);
      text("#starter-trial .trial-title",copy.trial.title);
      text("#starter-trial .trial-body",copy.trial.body);
      text("#starter-trial .trial-button",copy.trial.button);
      text("#starter-trial .trial-note",copy.trial.note);
    }

    text("#faq .section-head h2",copy.faq.title);
    items("#faq .qa summary",copy.faq.questions);
    itemHtmls("#faq .qa .a",copy.faq.answers);

    html(".cta-band h2",copy.cta.title);
    text(".cta-band p",copy.cta.body);
    item(".cta-band .btn",0,copy.cta.button);
    item(".cta-band .btn",1,copy.cta.support||copy.cta.button);

    item(".site-footer .foot-col:first-child p",0,copy.footer.lead);
    itemHtml(".site-footer .foot-col:first-child p",1,copy.footer.contact);
    items(".site-footer .foot-col h4",copy.footer.headings);
    items(".site-footer .foot-col:nth-child(2) li a",copy.footer.productLinks);
    items(".site-footer .foot-col:nth-child(3) li a",copy.footer.supportLinks);
    item(".site-footer .foot-bottom span",1,copy.footer.bottom);

    var select=one("#languageSelect");
    if(select){select.value=lang;}
  }

  var selected=resolveLanguage();
  applyLanguage(selected);

  var languageSelect=one("#languageSelect");
  if(languageSelect){
    languageSelect.addEventListener("change",function(event){
      var lang=normalize(event.target.value)||"en";
      try{localStorage.setItem(STORAGE_KEY,lang);}catch(e){}
      applyLanguage(lang);
    });
  }
})();
