export default function WorkingWithSkillsContent() {
  return (
    <article className="text-ink-2 leading-[1.75] space-y-9">
      <p className="text-[13px] text-ink-3">
        <span className="inline-block bg-tint rounded px-2 py-0.5 font-medium">예상 소요 시간 15분</span>
      </p>

      <section>
        <h2 className="text-[11px] font-bold tracking-widest uppercase text-accent mb-3">학습 목표</h2>
        <p className="mb-3 text-ink">이 레슨을 마치면 다음을 할 수 있게 됩니다.</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>스킬(Skills)이 무엇이며 Claude가 이를 어떻게 사용하는지 설명할 수 있다</li>
          <li>문서 생성을 위한 Anthropic의 빌트인 스킬을 식별할 수 있다</li>
          <li>설정에서 스킬을 활성화하고 관리할 수 있다</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3 tracking-[-0.3px]">스킬이란?</h2>
        <p className="mb-4">
          스킬은 Claude가 전문 작업에서의 성능을 끌어올리기 위해 동적으로 로드하는 지침·스크립트·리소스의 묶음(폴더)입니다.
          일종의 <span className="text-ink font-semibold">전문 지식 패키지</span>라고 생각하면 됩니다. 특정 작업을 매번
          같은 품질로 수행하는 방법을 Claude에게 가르치는 것이죠.
        </p>
        <p>
          Claude로 Excel 스프레드시트, PowerPoint 프레젠테이션, Word 문서, PDF를 만들어 본 적이 있다면 이미 스킬이
          동작하는 것을 경험한 셈입니다. 이러한 파일 생성 기능은 배경에서 실행되는 스킬이 구동합니다. 그러나 스킬의
          쓰임은 문서 생성에 그치지 않습니다. 커스텀 스킬은 분기 분산 분석 방법론, 브랜드 보이스 검토 프로세스, 컴플라이언스
          체크리스트처럼 반복 가능한 전체 워크플로우를 코드화해, Claude가 매번 같은 엄격한 절차를 따르도록 만들 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3 tracking-[-0.3px]">스킬의 종류</h2>
        <p className="mb-3">앞으로 마주치게 될 스킬은 크게 두 범주입니다.</p>
        <ul className="list-disc pl-5 space-y-2.5">
          <li>
            <strong className="text-ink">Anthropic 스킬</strong>은 Anthropic이 만들고 유지 관리합니다. Excel·Word·PowerPoint·PDF
            파일을 다루는 강화된 문서 생성 기능이 여기에 포함됩니다. 모든 유료 사용자에게 제공되며, 관련 작업이 감지되면 Claude가
            자동으로 호출하므로 특별히 조작할 필요가 없습니다.
          </li>
          <li>
            <strong className="text-ink">커스텀 스킬</strong>은 사용자 또는 소속 조직이 특수 워크플로우와 도메인 고유 작업을 위해
            직접 만드는 스킬입니다. 예를 들어 프레젠테이션에 회사의 브랜드 가이드라인을 적용하는 스킬, 회의록을 특정 포맷으로 정리하는
            스킬, 조직의 데이터 분석 절차를 실행하는 스킬 등을 만들 수 있습니다.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3 tracking-[-0.3px]">스킬 활성화하기</h2>
        <p className="mb-4">
          스킬은 현재 Pro, Max, Team, Enterprise 플랜 사용자를 위한 <span className="text-ink font-semibold">기능 프리뷰</span>로
          제공됩니다. 스킬은 Claude의 안전한 샌드박스 컴퓨팅 환경 위에서 동작하므로, 사용하려면 <span className="text-ink font-semibold">코드 실행</span>과
          <span className="text-ink font-semibold"> 파일 생성</span>이 활성화되어 있어야 합니다.
        </p>
        <p className="mb-3 text-ink font-semibold">스킬을 활성화하는 방법</p>
        <ol className="list-decimal pl-5 space-y-1.5 mb-4">
          <li><span className="text-ink font-semibold">설정 &gt; 기능(Capabilities)</span>으로 이동합니다.</li>
          <li><span className="text-ink font-semibold">코드 실행 및 파일 생성</span>이 켜져 있는지 확인합니다.</li>
          <li><span className="text-ink font-semibold">스킬(Skills)</span> 섹션으로 스크롤합니다.</li>
          <li>필요한 스킬을 개별적으로 켜거나 끕니다.</li>
        </ol>
        <p className="mb-3">
          <strong className="text-ink">Enterprise 플랜</strong>에서는 조직 소유자가 Admin 설정에서 먼저 코드 실행과 스킬을 모두
          켜야 구성원이 접근할 수 있습니다.
        </p>
        <p className="mb-3">
          <strong className="text-ink">Team 플랜</strong>에서는 이 기능 프리뷰가 조직 수준에서 기본 활성화되어 있습니다.
        </p>
        <p>
          활성화 후 설정에 들어가면 Anthropic의 빌트인 스킬과 사용자가 업로드한 커스텀 스킬을 포함한 사용 가능한 스킬 목록이 표시됩니다.
        </p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3 tracking-[-0.3px]">실제로 스킬 사용하기</h2>
        <p className="mb-4">
          스킬의 장점은 사용자가 스킬을 직접 의식할 필요가 거의 없다는 점입니다. 요청 내용에 맞춰 Claude가 적절한 스킬을 자동으로
          선택합니다. 스킬을 호출하게 되는 프롬프트의 예시:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 mb-4">
          <li>"월간 지출을 추적하고 합계 수식이 들어간 Excel 스프레드시트를 만들어 줘."</li>
          <li>"이 회의록 문서를 PowerPoint 프레젠테이션으로 변환해 줘."</li>
          <li>"이 데이터를 요약한 PDF 보고서를 생성해 줘."</li>
          <li>"시나리오 분석이 포함된 Excel 재무 모델을 만들어 줘."</li>
        </ul>
        <p>
          Claude가 스킬을 사용할 때는 사고 과정(chain of thought)에 해당 스킬이 언급되는 것을 볼 수 있습니다. 결과물은 컴퓨터에 저장하거나
          Google Drive에 바로 저장할 수 있는 다운로드 파일 형태로 제공됩니다.
        </p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3 tracking-[-0.3px]">파일 실행</h2>
        <p className="text-ink font-semibold mb-3">
          슬라이드·스프레드시트·계약서 수정까지, Claude가 사용자의 실제 파일과 함께 작업합니다
        </p>
        <p className="mb-4">
          같은 맥락에서 Claude는 샌드박스 환경 안에서 <span className="text-ink font-semibold">사용자의 실제 파일</span>을 다루어
          업데이트된 버전을 생성할 수 있습니다(참고: 챗에서는 원본을 직접 수정하는 대신 새 버전의 문서를 만듭니다).
          슬라이드·스프레드시트·계약서—또는 .xlsx, .pptx, .docx, .pdf 파일—을 업로드하면 Claude가 슬라이드를 구성하고 분석을 수행하며
          제안 편집을 적용합니다. 작업이 끝나면 해당 파일을 다운로드하거나 Drive에서 바로 열 수 있습니다.
        </p>
        <p>
          참고: 이 기능을 사용하려면 Claude에 외부 데이터 소스 접근 권한을 부여해야 합니다. 프롬프트가 뜨면
          <span className="text-ink font-semibold"> 제한된 네트워크 액세스 허용</span>을 켜면 됩니다.
        </p>

        <div className="mt-6 bg-ghost border border-stroke rounded-card p-5">
          <h3 className="text-[11px] font-bold tracking-widest uppercase text-accent mb-3">보안 고려 사항</h3>
          <p className="mb-3">스킬은 실행 가능한 코드를 포함할 수 있으므로 신중하게 다뤄야 합니다.</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>신뢰할 수 있는 출처의 커스텀 스킬만 설치하세요.</li>
            <li>Anthropic의 빌트인 스킬은 Anthropic이 테스트하고 유지 관리합니다.</li>
            <li>업로드한 커스텀 스킬은 해당 개인 계정에만 비공개로 유지됩니다.</li>
            <li>외부 출처의 커스텀 스킬을 설치하기 전에는 내용을 반드시 검토해 동작을 파악하세요.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3 tracking-[-0.3px]">커스텀 스킬 만들기</h2>
        <p className="mb-4">
          Anthropic의 빌트인 스킬이 일반적인 문서 생성 작업을 커버한다면, 스킬의 진짜 힘은 직접 만드는 순간 드러납니다.
          커스텀 스킬은 사용자만의 워크플로우·브랜드 가이드라인·일하는 방식을 Claude에게 가르쳐, 관련 상황에서 그 지식을 자동으로
          적용하게 해 줍니다.
        </p>
        <p className="mb-4">
          커스텀 스킬을 만드는 가장 쉬운 방법은 <span className="text-ink font-semibold">Claude와의 대화</span>를 이용하는 것입니다.
          코드를 작성하거나 파일을 수동으로 구성할 필요가 없습니다. 기술적인 구조는 Claude가 알아서 처리합니다.
        </p>
        <p className="mb-3 text-ink font-semibold">대화로 스킬 만드는 방법</p>
        <ol className="list-decimal pl-5 space-y-2.5 mb-4">
          <li>
            <span className="text-ink font-semibold">새 채팅을 시작</span>하고 만들고 싶은 스킬이 무엇인지 이야기합니다. 예: "분기
            비즈니스 리뷰를 작성하는 스킬을 만들고 싶어", "프레젠테이션에 브랜드 가이드라인을 적용하는 스킬이 필요해".
          </li>
          <li>
            <span className="text-ink font-semibold">Claude의 질문에 답합니다.</span> Claude는 워크플로우를 인터뷰하듯 묻습니다—이
            스킬이 해야 할 일은 무엇인가? 좋은 결과물의 조건은 무엇인가? 어떤 상황에서 이 스킬을 쓰게 될까?
          </li>
          <li>
            <span className="text-ink font-semibold">참고 자료를 업로드</span>합니다. 템플릿·스타일 가이드·브랜드 에셋·모범이 되는
            작업물 등이 있다면 Claude가 원하는 결과를 더 정확히 이해하는 데 도움이 됩니다.
          </li>
          <li>
            <span className="text-ink font-semibold">스킬을 저장</span>합니다. 완료되면 Claude가 올바른 구조로 패키징된 스킬 파일을
            생성합니다. 저장만 해 두면 바로 사용할 수 있습니다.
          </li>
        </ol>
        <p className="mb-3">
          <span className="text-ink font-semibold">내 스킬 확인하기.</span> 왼쪽 사이드바의 Customize 탭에서 사용 가능한 스킬을 모두
          볼 수 있고, 수동으로 또는 Claude와 대화하면서 편집할 수도 있습니다.
        </p>
        <p>
          새로 만든 커스텀 스킬은 Anthropic의 빌트인 스킬과 함께 목록에 표시됩니다. 이후부터는 관련 작업이 들어올 때마다 Claude가
          자동으로 호출하므로 수동 트리거가 필요하지 않습니다. 스킬은 반복을 통해 개선할 수 있으며, Claude에게 편집을 요청하면 파일을
          업데이트해 줍니다.
        </p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3 tracking-[-0.3px]">스킬 vs. 프로젝트</h2>
        <p className="mb-4">
          스킬과 프로젝트 모두 Claude에 추가 컨텍스트를 제공할 수 있다면, 각각 언제 써야 할까요? 기억하기 좋은 한 줄:
          <span className="text-ink font-semibold"> 프로젝트는 지식을 담고, 스킬은 작업을 수행한다.</span>
        </p>
        <p className="mb-4">
          <strong className="text-ink">프로젝트</strong>는 지식 허브입니다. Claude가 여러분의 업무를 이해하는 데 필요한 참고 자료
          —프로젝트 사양, 회의록, 리서치 문서 등—를 담아 둡니다. 프로젝트에 파일을 올려 두면 Claude는 해당 프로젝트의 모든 대화에서
          그 정보를 활용합니다.
        </p>
        <p className="mb-4">
          <strong className="text-ink">스킬</strong>은 절차적 기계입니다. Claude가 작업을 <em>어떻게</em> 수행할지—구체적인 단계,
          연산 순서, 따라야 할 방법론—를 인코딩합니다. 반복되는 워크플로우를 일관된 품질로 실행해야 할 때 진가를 발휘합니다.
        </p>
        <p className="mb-5">
          두 기능은 서로를 보완합니다. 스킬은 프로젝트에 저장된 지식을 참조할 수 있습니다. 예를 들어 "고객 콜 준비" 스킬이 프로젝트
          지식 베이스에 업로드된 고객 프로필을 가져오는 식입니다. 프로젝트가 <em>무엇을</em>(정보)을 제공하고, 스킬이
          <em> 어떻게</em>(프로세스)를 담당합니다.
        </p>

        <div className="overflow-x-auto border border-stroke rounded-card">
          <table className="w-full text-sm">
            <thead className="bg-tint">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-ink border-b border-stroke w-28"></th>
                <th className="text-left px-4 py-3 font-semibold text-ink border-b border-stroke">프로젝트</th>
                <th className="text-left px-4 py-3 font-semibold text-ink border-b border-stroke">스킬</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 font-semibold text-ink border-b border-stroke align-top">목적</td>
                <td className="px-4 py-3 border-b border-stroke align-top">Claude가 참조할 지식을 저장</td>
                <td className="px-4 py-3 border-b border-stroke align-top">Claude가 실행할 프로세스를 정의</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-ink border-b border-stroke align-top">적합 용도</td>
                <td className="px-4 py-3 border-b border-stroke align-top">장기 컨텍스트, 참고 자료, 팀 협업</td>
                <td className="px-4 py-3 border-b border-stroke align-top">반복 워크플로우, 다단계 작업, 일관된 방법론</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-ink border-b border-stroke align-top">예시</td>
                <td className="px-4 py-3 border-b border-stroke align-top">고객 허브, 리서치 버디, 피드백 생성기</td>
                <td className="px-4 py-3 border-b border-stroke align-top">프로세스 가이드(브랜드·법무), 블로그 초안, PDF 생성</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-ink align-top">지속성</td>
                <td className="px-4 py-3 align-top">프로젝트 내 모든 채팅에서 지식 사용 가능</td>
                <td className="px-4 py-3 align-top">스킬이 호출되는 순간에 지침 적용</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3 tracking-[-0.3px]">레슨 돌아보기</h2>
        <p className="mb-3">다음으로 넘어가기 전에 스스로에게 질문해 봅시다.</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>정기적으로 만드는 문서 중 Claude의 빌트인 스킬이 도움 될 만한 것은 무엇인가요?</li>
          <li>업무 중 반복되는 워크플로우 중 커스텀 스킬의 좋은 후보가 될 만한 것이 있나요?</li>
          <li>스킬은 여러분의 문서 생성·데이터 분석 방식에 어떤 변화를 가져올 수 있을까요?</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3 tracking-[-0.3px]">다음 이야기</h2>
        <p>
          이어지는 레슨부터는 커넥터로 Claude의 활동 범위를 넓혀 갑니다. 이 강력한 도구들은 정보 수집을 자연스럽게 이어 주고,
          업무가 일어나는 도구 안에서 Claude가 직접 작업을 수행할 수 있게 해 줍니다.
        </p>
      </section>
    </article>
  )
}
